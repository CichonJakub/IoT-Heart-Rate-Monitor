#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MAX30105.h"
#include "heartRate.h"

const char caCert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----			// Key taken from the internet, to make it work change it into Your own keys generated locally in OpenSSL
MIICXTCCAcACFF5V6YB+L+q1Aws2ui4xK6z/tpTxMAoGCCqGSM49BAMCMG4xCzAJ
BgNVBAYTAlBMMRQwEgYDVQQIDAtNYWxvcG9sc2tpZTEPMA0GA1UEBwwGS3Jha293
MSEwHwYDVQQLDBhEb21haW4gQ29udHJvbCBWYWxpZGF0ZWQxFTATBgNVBAMMDDE5
Mi4xNjguMS40MzAeFw0yMDAzMjQwMDQ0MjdaFw0zMDAzMjIwMDQ0MjdaMG4xCzAJ
BgNVBAYTAlBMMRQwEgYDVQQIDAtNYWxvcG9sc2tpZTEPMA0GA1UEBwwGS3Jha293
MSEwHwYDVQQLDBhEb21haW4gQ29udHJvbCBWYWxpZGF0ZWQxFTATBgNVBAMMDDE5
Mi4xNjguMS40MzCBmzAQBgcqhkjOPQIBBgUrgQQAIwOBhgAEAA9bBbHsVQSLjnwb
Jwe9zbrhQ/T6tMTmZp5b4IZvH7hmHcdf3bN6dtUwDqrIiTBXq7bhomnLX0zHjn0g
SVGbkU1uAWcA5jwKLoAtg+Rx48hgAUv2HZhF0xU0cgJInszmtlq39De9MJuxerV3
IoTlSfiN7TF0ooNw8OcF18+HJPVz4O+xMAoGCCqGSM49BAMCA4GKADCBhgJBSiO9
SegXh8CzBMyqGDAv7mCMAPIly13+riIE+4iSC7IONWzo7bcIumDZu6A83KZ30hGR
tYYi0kAl0TuJnVKzZqYCQXWVmSBXmfHaHdgwOA/U0Lu7NbfJ5IO8QFoq45UvkmxE
9VSJ+x27PA4k7qCz+mcODaR8adYf5BJRKIBcBrllHHQ6
-----END CERTIFICATE-----
)EOF";

// maximum received message length 
#define MAX_MSG_LEN (128)

MAX30105 particleSensor;

// WiFi configuration
const char* ssid = "Network_name";	// needs to be filled depending from user settings
const char* password = "wifi_password"; // needs to be filled depending from user settings

// MQTT configuration
// hostanem of the server is his IP address
const IPAddress serverIPAddress(192, 168, 1, 43);

// Fingerprint taken from the internet, to make it work change it into broker's fingerprint
const uint8_t mqttCertFingerprint[] = {0xB1,0x93,0x88,0xA6,0x3D,0xB0,0x21,0xA1,0xF4,0xB5,0xFB,0xD9,0xCE,0xCC,0x1F,0x66,0x8F,0x31,0x8F,0xA4};

X509List caCertX509(caCert); 

// the topic we will use
const char *topic = "from/esp";
const char *topic_rec = "to/esp";

// Create the MQTT and WiFi stacks
WiFiClientSecure espClient;
PubSubClient client(espClient);

const byte RATE_SIZE = 3; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;
bool measure = false;

unsigned long StartTime;
unsigned long CurrentTime;
unsigned long ElapsedTime;

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT); // esp is working, the led will be on
  digitalWrite(LED_BUILTIN, LOW);
  // serial port for debugging
  Serial.begin(115200);
  Serial.println("Initializing...");

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");
  
  espClient.setTrustAnchors(&caCertX509);         /* Load CA cert into trust store */
  espClient.allowSelfSignedCerts();               /* Enable self-signed cert support */
  espClient.setFingerprint(mqttCertFingerprint);  /* Load SHA1 mqtt cert fingerprint for connection validation */
  
  // initialize wifi connection - this will wait until connected
  connectWiFi();
  
  // connect to MQTT server
  client.setServer(serverIPAddress, 8883);
  client.setCallback(callback);

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0); //Turn off Red LED
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
}

void loop() { 
  if (!client.connected()){
    connectMQTT();
    delay(500);
  }
  long irValue = particleSensor.getIR();
  client.loop();
  if(measure == 1){
    CurrentTime = millis();
    ElapsedTime = CurrentTime - StartTime;
    Serial.print(ElapsedTime);
    if(ElapsedTime < 11200){
      if (checkForBeat(irValue) == true)
      {
        //We sensed a beat!
        long delta = millis() - lastBeat;
        lastBeat = millis();
        Serial.print("Czas=");
        Serial.print(delta);
        beatsPerMinute = 60 / (delta / 1000.0);
    
        /*if (beatsPerMinute < 255 && beatsPerMinute > 30)
        {
          rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
          rateSpot %= RATE_SIZE; //Wrap variable
    
          //Take average of readings
          beatAvg = 0;
          for (byte x = 0 ; x < RATE_SIZE ; x++)
            beatAvg += rates[x];
            beatAvg /= RATE_SIZE;
        }*/
      }
      // this is essential for mqtt server publishing
      //client.loop();
      char result[8]; // Buffer big enough for 7-character float
      dtostrf(beatsPerMinute, 6, 2, result); // Leave room for too large numbers!
      client.publish(topic, result);//"tutaj ja Twoje ESP8266");
      Serial.print("IR=");
      Serial.print(irValue);
      Serial.print(", BPM=");
      Serial.print(beatsPerMinute);
      //Serial.print(", Avg BPM=");
      //Serial.print(beatAvg);
    
      if (irValue < 50000)
        Serial.print(" No finger?");
    
      Serial.println();
    }
    else{
      beatsPerMinute = 0;
      particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED, end of measures
      measure = false;
      Serial.println(measure);
    }
  }
}

void connectWiFi() {
  delay(10);
  // Connecting to a WiFi network
  Serial.printf("\nConnecting to %s\n", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
    digitalWrite(LED_BUILTIN, LOW);
    particleSensor.setPulseAmplitudeGreen(0);
    particleSensor.setPulseAmplitudeRed(0);
  }
  Serial.println("");
  Serial.print("WiFi connected on IP address ");
  Serial.println(WiFi.localIP());
}

void connectMQTT() {
  // Wait until we're connected
  while (!client.connected()){
    // Create a random client ID
    String clientId = "ESP8266-";
    clientId += String(random(0xffff), HEX);
    Serial.printf("MQTT connecting as client %s...\n", clientId.c_str());
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT connected");
      // Once connected, publish an announcment...
      client.publish(topic_rec, "hello from ESP8266");
      // ... and resubscribe
      client.subscribe(topic_rec);
      //client.subscribe(topic);
      digitalWrite(LED_BUILTIN, HIGH); 
      particleSensor.setPulseAmplitudeGreen(0x0A); // Turn on red LED, the sensor can be used and it's running    
    }
    else {
      digitalWrite(LED_BUILTIN, LOW);
      particleSensor.setPulseAmplitudeGreen(0);
      particleSensor.setPulseAmplitudeRed(0);
      Serial.printf("MQTT failed, state %s, retrying...\n", client.state());
      // Wait before retrying
      delay(2500);
    }
  }
}

int check_message;
void callback(char* topic, byte* payload, unsigned int length) {

  String receivedtopic = topic;
  String receivedpayload ;

  String value = "";
  for (int i=0;i<length;i++) {
      value += (char)payload[i];
  }
  check_message = value.toInt();
  Serial.println(check_message);
  
  static char message[MAX_MSG_LEN+1];
  if (length > MAX_MSG_LEN) {
    length = MAX_MSG_LEN;
  }
  strncpy(message, (char *)payload, length);
  message[length] = '\0';
  
  Serial.printf("topic %s, message received: %s\n", topic, message); 
  
  if( receivedtopic == "to/esp" ){
    if( check_message != 0 ){
      Serial.println((char *)payload);
      particleSensor.setPulseAmplitudeRed(0x0A); //Turn on Red LED, start of measures 0x0A
      particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED, start of measures
      measure = true;
      Serial.println(measure);
      StartTime = millis(); // poczatek pomiaru
    }
    else{
      Serial.println((char *)payload);
      particleSensor.setPulseAmplitudeRed(0); // Turn off Red Light, stop of measures 
      particleSensor.setPulseAmplitudeGreen(0x0A); //Turn on Green LED, start of measures
      measure = false;
      beatsPerMinute = 0; 
      Serial.println(measure);
    }
  }
}
