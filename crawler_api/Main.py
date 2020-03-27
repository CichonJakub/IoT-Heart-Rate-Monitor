#uaktualnij raz na 24 h
#generuj odpowiedzi 5 obrazkow, 3 linki, porada
import os
import psycopg2 as pg
from crawler_api.Pinterest_Crawler import *
from crawler_api.YT_Search import *
from crawler_api.adviceSearcher import *

def update():

    #  update obrazkow
    p = PinCrawling()

    p.login(p.browser)

    low = ["horror"]
    high = ["cute"]

    pins_ids_low, pins_urls_low = p.get_data(p.browser, low)
    p.update_data(pins_ids_low, pins_urls_low, "low")

    pins_ids_high, pins_urls_high = p.get_data(p.browser, high)
    p.update_data(pins_ids_high, pins_urls_high, "high")

    p.browser.close()

    #  update muzyki

    yt = YTSearch()
    yt_urls_high = yt.update("high")
    yt_urls_low = yt.update("low")

    return pins_urls_low, pins_urls_high, yt_urls_low, yt_urls_high


def database():
    DATABASE_URL = os.environ['DATABASE_URL'] = 'postgres://lweqbohgxkcciy:7141ba34c439114499df64f7c3e33db129f7961287f7dffa300255988e1fb029@ec2-176-34-97-213.eu-west-1.compute.amazonaws.com:5432/df7co2dencuc14'
    conn = pg.connect(DATABASE_URL, sslmode='require')
    c = conn.cursor()
    postgres_insert_zdjecia = "INSERT INTO zdjecia (""kategoria"",""link"") VALUES (%s,%s)"
    postgres_insert_muzyka = "INSERT INTO muzyka (""kategoria"",""link"") VALUES (%s,%s)"
    postgres_insert_porady = "INSERT INTO porady (""kategoria"",""link"") VALUES (%s,%s)"
    #c.execute("SELECT * FROM muzyka")
    #eh = c.fetchall()
    #print(eh)
    low_photos, high_photos, low_music, high_music = update()
    high_porady = get_results("jak obnizyc puls")
    low_porady = get_results("jak podniesc tetno")

    for l in low_photos:
        record_to_insert = (0, l)
        c.execute(postgres_insert_zdjecia, record_to_insert)
        conn.commit()

    for h in high_photos:
        record_to_insert = (1, h)
        c.execute(postgres_insert_zdjecia, record_to_insert)
        conn.commit()

    for l in low_music:
        record_to_insert = (0, l)
        c.execute(postgres_insert_muzyka, record_to_insert)
        conn.commit()

    for h in high_music:
        record_to_insert = (1, h)
        c.execute(postgres_insert_muzyka, record_to_insert)
        conn.commit()

    for l in low_porady:
        record_to_insert = (0, l)
        c.execute(postgres_insert_porady, record_to_insert)
        conn.commit()

    for h in high_porady:
        record_to_insert = (1, h)
        c.execute(postgres_insert_porady, record_to_insert)
        conn.commit()


#database() jeszcze zeby sprawdzalo czy takie cos jest w bazie i ewentualnie dodac

