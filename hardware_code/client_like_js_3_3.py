import socketio
import time
import os
import sys
import broker
import json
import chech3_2
import threading
import encryption

class PulseMeasure:
    def __init__(self, user, pomiar):
        self.user = user
        self.pomiar = pomiar

sio = socketio.Client()


def emit_to_server(id, pulse):
    pulse = str(pulse)
    pulse = encryption.encrypt_my_pulse(pulse)
    pomiar = PulseMeasure(id, pulse)
    json_pomiar = json.dumps(pomiar.__dict__)
    print(json_pomiar)
    sio.emit("pomiarResults", json_pomiar)
    sio.send("pomiarResults")
    print("wyslano pomiar")

def emit_raw_data(id, raw_data):
    encrypted_data = encryption.encrypt_my_pulse(raw_data)
    print(encrypted_data)
    data = PulseMeasure(id, encrypted_data)
    json_data = json.dumps(data.__dict__)
    print(json_data)
    sio.emit("testRawData", json_data)
    sio.send("testRawData")
    print("wyslano surowe dane")


@sio.on('connect')
def socket_connected():
    sio.emit("iAmHardware", "cokolwiek")
    sio.send("iAmHardware")
    print("connected!")
    print(sio.eio.sid)


@sio.on('message')
def message_received(message):
    print(message)


@sio.on('elo')
def message_received(message):
    print(message)


@sio.on('ack')
def message_received(message):
    print(message)


@sio.on('requestPomiar2')
def message_received(message):
    global is_measure

    if is_measure == 1:
        print(message)
        user_id = message
        emit_to_server(user_id, "WAITTOEND")

    else:
        is_measure = 1
        trigger = True
        print(message)
        user_id = message
        print("trigger otrzymany")
        
        if trigger:
            x = threading.Thread(target=broker.measure())
            x.start()

        time.sleep(13)
        my_pulse = chech3_2.function_check()
        print(my_pulse)
        emit_to_server(user_id, my_pulse)
        is_measure = 0

@sio.on('askForRawData')
def message_received(message):
    print(message)
    user_id = message
    print("server chce raw data")
    raw_data = chech3_2.get_raw_data()
    print(raw_data)
    emit_to_server(user_id, raw_data)

is_measure = 0
sio.connect('https://iot-pulsometr.herokuapp.com')
