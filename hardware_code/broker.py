#!Python3
# coding=utf-8

from datetime import datetime
import paho.mqtt.client as mqttClient
import time
import ssl
import sys
import statistics
import os


def measure():
    
    # erasing measure file
    erase_file = open("/home/pi/Desktop/results.txt", mode="r+")
    erase_file.seek(0)
    erase_file.truncate()
    
    time_limit = 11
    drawback_time = 11 # jezeli jest rowne dokladnie 10 to nie chce konczyc polaczenia

    def on_connect(client, userdata, flags, rc):

        if rc == 0:

            print("Connected to broker")

            global Connected                
            Connected = True

        else:
            
            print("Connection failed")

    def on_message(client, userdata, message):
        if (time.time() - start) < time_limit:
            print(time.time() - start)
            print()
            print("Message received: ",str( message.payload.decode("utf-8")))
            with open('/home/pi/Desktop/results.txt',mode='a') as f:
                f.write(message.payload.decode("utf-8") + "\n")
        else:
            drawback()

    def drawback():
        print("koncze...")
        client.publish("to/esp", "0")
        cls()
        
    def cls():
        client.loop_stop()
        return
        
        
    Connected = False   #global variable for the state of the connection

    broker_address= "192.168.1.43"  #Broker address
    port = 8883                         #Broker port

    client = mqttClient.Client("Python")               #create new instance

    client.tls_set("/home/mosquitto/mqtt-cert/ca.crt", tls_version=ssl.PROTOCOL_TLSv1_2)
    client.tls_insecure_set(True)

    client.on_message= on_message                      #attach function to callback
    print("connecting to broker")
    client.connect(broker_address, port) #connect

    print("Publishing to topic", "to/esp")
    client.publish("to/esp", "1") # <- Sending '1' = True to esp to start making measures and publish them to broker

    print("Subscribing to topic", "from/esp")
    client.subscribe("from/esp")
    stamp = datetime.now().second   # first stamp to make measure
    start = time.time()

    client.loop_start() #then keep listening forever
