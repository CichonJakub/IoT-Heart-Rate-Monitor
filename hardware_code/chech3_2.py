#!Python3
import statistics
import os
import broker


def function_check():
    counter = 0
    count_line = 0
    pulse = []

    with open("/home/pi/Desktop/results.txt", mode='r') as f:
        for line in f:
            count_line += 1
            counter += 1
            line.strip()
            data = float(line[0:-1])
            if data > 40 and data < 300:
                pulse.append(data)

    pulse = set(pulse)
    if len(pulse) > 0:
        avg = sum(pulse) / len(pulse)
        single_pulse = statistics.median(pulse)
        print(single_pulse)
        print(counter)
    elif count_line >0:
        single_pulse = "BADMEASURE"
    else:
        single_pulse = "FAILEDTOMEASURE"
    

    return single_pulse

def get_raw_data():
    raw_data = ''
    count_line = 0
    with open("/home/pi/Desktop/results.txt", mode='r') as f:
        for line in f:
            count_line += 1
            line.strip()
            data = float(line[0:-1])
            data = str(data)
            if len(raw_data) != 0:
                raw_data = raw_data + ';'

            raw_data = raw_data + data
    if count_line == 0:
        raw_data = 'pusty plik'
    return raw_data
    