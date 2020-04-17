import os
from statistics import mean

import psycopg2 as pg
from datetime import date

def srednia_dzien(id_uzytkownika):
    today = date.today()
    print(today)
    #polaczenie sie z baza danych
    try:
        DATABASE_URL = os.environ['DATABASE_URL'] = 'postgres://lweqbohgxkcciy:7141ba34c439114499df64f7c3e33db129f7961287f7dffa300255988e1fb029@ec2-176-34-97-213.eu-west-1.compute.amazonaws.com:5432/df7co2dencuc14'
        conn = pg.connect(DATABASE_URL, sslmode='require')
        print('connected')
        c = conn.cursor()
    except:
        print('blad polaczenia z baza danych')


    #wybranie wszytskich pomiarów wykonanych tego dnia przez uzytkownika
    try:
        select_values = "SELECT wartosc from pomiary where data_pomiaru::TIMESTAMP::DATE = \'" + str(today) + "\'"
        c.execute(select_values)
        measurement_values = c.fetchall()

        # zmiana krotki -> liste
        x = []
        for value in measurement_values:
            x.extend(value)
            print(value)

        srednia = mean(x)
    except:
        print('blad odczytu')

    # wpisanie do bazy danych lub uaktualnianie danych
    try:
        select_user_and_date = "SELECT id_osoby, data_pomiaru from statystyki where data_pomiaru = \'" + str(
            today) + "\'"
        c.execute(select_user_and_date)
        results = c.fetchall()
        if len(results) == 0:
            insert_all = "INSERT INTO statystyki (id_osoby, srednia) VALUES (%s,%s)"
            c.execute(insert_all, (str(id_uzytkownika), str(srednia)))
            conn.commit()
        else:
            update_avg = "UPDATE statystyki SET srednia = \'" + str(srednia) + "\' where data_pomiaru = \'" + str(
                today) + "\' and id_osoby = \'" + str(id_uzytkownika) + "\'"
            c.execute(update_avg)
            conn.commit()
            print(c.query)
    except:
        print("Nie udalo sie zapisac do bazy")


//srednia_dzien(2);
