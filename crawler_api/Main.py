#uaktualnij raz na 24 h
#generuj odpowiedzi 5 obrazkow, 3 linki, porada
import psycopg2

con = psycopg2.connect(database="iot", user="pulsometr", password="Marcin", host="localhost", port="5432")

print("Database opened successfully")