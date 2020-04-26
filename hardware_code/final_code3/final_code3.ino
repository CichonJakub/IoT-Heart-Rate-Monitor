#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MAX30105.h"
#include "heartRate.h"

const char caCert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----	// Key taken from the internet, to make it work change it into Your own keys generated locally in OpenSSL
MIHcAgEBBEIATXmkkoaxsd7d6QvaLYOFBpVWIKkpZiIVifjWyEvG7KORzlGXuWzA
67CkiTbUMscnzM7kn/YrwmITRDaYQ2eF0jagBwYFK4EEACOhgYkDgYYABAFzgTPk
co/CM1hNYyRm8Tnlq0l+rnFSst74VHqoj2wD9XOz7W8iFX1C0J4KsQy2N6FAccym
72tTstwCruZmuc91mgC+RyRm9TxcwvztEOFDkWeKpVCrheILGH03zBqb93p9nTIa
bUMscnzM7kn/YrwmITRDaYQ2eF0jagBwYFK4EEACOhgYkDgYYABAFzgTPkco/CM1
Rm8Tnlq0l+rnFSst74VHqoj2wD9XOz7W8iFX1C0J4KsQy2N6FAccymFSst74VHqF
zBqb93p9nTIa72tTstwCruZmuc91mgC+RyRm9TxcwvztEOFDkWeKpVCrheILGH03
zM7kn/YrwmITRDaYQ2eF0jag67CkiTbUMscnBwYFK4EEACOhgYkDgYYABAFzgTPk
qoj2wD9XOzco/CM1hNYJ4KsQy2N6FAccymyRm8Tnlq0l+7W8iFX1C0rnFSst74VH
rheILGH03zBqb93p9nTIa72tTc91mgC+RyRm9TxcwvztEOFDkWeKpVCstwCruZmu
qoj2wD9XOzco/CM1hGbPfS2UEKITVxTth9OZ+4rplg==
-----END CERTIFICATE-----
)EOF";

// maximum received message length 
#define MAX_MSG_LEN (128)

MAX30105 particleSensor;


// WiFi configuration
const char* ssid = "NETWORK NAME";	// needs to be filled depending from user settings
const char* password = "********";		// needs to be filled depending from user settings

// MQTT configuration
// hostname of the server is his IP address
const IPAddress serverIPAddress(192, 168, 1, 43);	// needs to be filled depending from user settings IP address of the broker in this case raspberry pi

// Fingerprint taken from the internet, to make it work change it into broker's fingerprint
const uint8_t mqttCertFingerprint[] = {0xFF,0x69,0xBB,0xAD,0xF0,0xDE,0x5F,0x89,0x23,0xF6,0x96,0xC1,0x03,0x04,0x23,0xB4,0xD3,0xD5,0x53,0x94};

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
