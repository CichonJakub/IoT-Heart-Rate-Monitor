final_code3 is the code that needs to be uploaded on esp8266 D1 mini via arduino IDE and some libriaries necessary for program to run.

The rest are programs running on raspberry pi.

client_like_js_3_3.py is used to connect to the server and triggers the rest of scripts.

broker.py is a script that runs as subscriber to mqtt topics and triggers pulse measurement to receving esp8266.

chech3_2.py is a script that after broker.py ends working, reads from a file and calculate average pulse from measures.

