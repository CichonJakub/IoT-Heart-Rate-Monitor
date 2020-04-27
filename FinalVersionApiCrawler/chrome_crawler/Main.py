import psycopg2 as pg
from pinterest_crawler import *
from YT_Search import *
from adviceSearcher import *
from apscheduler.schedulers.blocking import BlockingScheduler
import validators

#  baza danych
DATABASE_URL = os.environ[
        'DATABASE_URL'] = 'url'
conn = pg.connect(DATABASE_URL, sslmode='require')
c = conn.cursor()

# max liczba zdjec i muzyki
max_zdjecia = 2000  # max ilosc zdjec 0 lub 1
max_muzyka = 2000  # max ilosc porad 0 lub 1

# kategorie
kategoria = [0, 1]

# liczba muzyki i zdjec w bazie danych
muzyka_count = "select count(*) from muzyka where kategoria = %s"
zdjecia_count = "select count(*) from zdjecia where kategoria = %s"


#  update obrazkow
def update_zdjecia():
    p = PinCrawling()

    p.login(p.driver)

    low = ["scary%20drawings"]
    high = ["cute"]

    pins_urls_low = p.get_data(p.driver, low)
    pins_urls_high = p.get_data(p.driver, high)

    print("The end of 'zdjecia'!")

    p.driver.close()
    return pins_urls_low, pins_urls_high


# update muzyki
def update_muzyka():
    yt = YTSearch()
    yt_high = yt.update("high")
    yt_low = yt.update("low")
    print("The end of 'muzyka'!")
    return yt_low, yt_high


# update bazy danych
def database():
    postgres_insert_zdjecia = "INSERT INTO zdjecia (""kategoria"",""link"") VALUES (%s,%s)"
    postgres_insert_muzyka = "INSERT INTO muzyka (""kategoria"",""link"") VALUES (%s,%s)"

    low_photos = high_photos = low_music = high_music = []

    try:
        low_photos, high_photos = update_zdjecia()
        low_music, high_music = update_muzyka()

    except:
        info = "Something went wrong"
        print(info)

    muzyka_query = "select * from muzyka where link = %s"
    zdjecia_query = "select * from zdjecia where link = %s"

    muzyka_count_all = "select count(*) from muzyka"
    zdjecia_count_all = "select count(*) from zdjecia"

    for l in low_photos:
        c.execute(zdjecia_count, (0,))
        if c.fetchone()[0] < max_zdjecia - 10:
            c.execute(zdjecia_query, (l,))
            # print(c.fetchone())
            if c.fetchone() is None:
                # print("nie ma takiego linku - wsadzamy!")
                record_to_insert = (0, l)
                c.execute(postgres_insert_zdjecia, record_to_insert)
                conn.commit()
            else:
                info = "jest taki link!"
                # print(info)

    for h in high_photos:
        c.execute(zdjecia_count, (1,))
        if c.fetchone()[0] < max_zdjecia - 10:
            c.execute(zdjecia_query, (h,))
            if c.fetchone() is None:
                # print("nie ma takiego linku - wsadzamy!")
                record_to_insert = (1, h)
                c.execute(postgres_insert_zdjecia, record_to_insert)
                conn.commit()
            else:
                info = "jest taki link!"
                # print(info)

    for l in low_music:
        c.execute(muzyka_count, (0,))
        if c.fetchone()[0] < max_muzyka - 10:
            c.execute(muzyka_query, (l,))
            if c.fetchone() is None:
                # print("Nie ma takiego linku! - wsadzamy!")
                record_to_insert = (0, l)
                c.execute(postgres_insert_muzyka, record_to_insert)
                conn.commit()
            else:
                info = "jest taki link!"
                # print(info)

    for h in high_music:
        c.execute(muzyka_count, (1,))
        if c.fetchone()[0] < max_muzyka - 10:
            c.execute(muzyka_query, (h,))
            if c.fetchone() is None:
                # print("Nie ma takiego linku! - wsadzamy!")
                record_to_insert = (1, h)
                c.execute(postgres_insert_muzyka, record_to_insert)
                conn.commit()
            else:
                info = "jest taki link!"
                # print(info)


# usuwanie starych danych
def delete_old():
    muzyka_query = "delete from muzyka where link = any (select link FROM muzyka where kategoria = %s limit %s)"
    zdjecia_query = "delete from zdjecia where link = any (select link FROM zdjecia where kategoria = %s limit %s)"

    # bierze procent z tego co jest
    for i in kategoria:
        c.execute(muzyka_count, (i,))
        count = c.fetchone()[0]
        if count > max_muzyka:
            c.execute(muzyka_query, (i, round(0.25 * count, 0)))
            conn.commit()

        c.execute(zdjecia_count, (i,))
        count = c.fetchone()[0]
        if count > max_zdjecia:
            c.execute(zdjecia_query, (i, round(0.25 * count, 0)))
            conn.commit()


def delete_porady():
    porady_query = "delete from porady where kategoria = %s"

    for i in kategoria:
        c.execute(porady_query, (i,))
        conn.commit()


# update porad
def update_porady():
    high_porady = get_results("jak obnizyc puls")
    low_porady = get_results("za niski puls")

    postgres_insert_porady = "INSERT INTO porady (""kategoria"",""link"") VALUES (%s,%s)"
    porady_query = "select * from porady where link = %s"

    for l in low_porady:
        c.execute(porady_query, (l,))
        if c.fetchone() is None:
            # print("Nie ma takiego linku! - wsadzamy!")
            record_to_insert = (0, l)
            c.execute(postgres_insert_porady, record_to_insert)
            conn.commit()
        else:
            info = "jest taki link!"
            # print(info)

    for h in high_porady:
        c.execute(porady_query, (h,))
        if c.fetchone() is None:
            # print("Nie ma takiego linku! - wsadzamy!")
            record_to_insert = (1, h)
            c.execute(postgres_insert_porady, record_to_insert)
            conn.commit()
        else:
            info = "jest taki link!"
            # print(info)


# sprawdzenie linkow do porad
def check_urls():
    porady = "select link from porady"
    porady_count = "select count(*) from porady"
    c.execute(porady)
    links = c.fetchall()

    for link in links:
        valid = validators.url(link[0])
        if valid:
            info = "Url is valid"
            # print("Url is valid")
        else:
            info = "Not valid Url found - updating 'porady'"
            print(info)
            delete_porady()
            update_porady()
            # uruchamiamy advice search.py
    c.execute(porady_count)
    if c.fetchone()[0] == 0:
        update_porady()


sched = BlockingScheduler()


@sched.scheduled_job('interval', hours=48)
def run():
    print("IT WORKS")
    delete_old()
    print("Old are deleted")
    database()
    print("New are added")
    check_urls()
    print("Urls are checked")
    print("The end - see you in 48 hours ;)")


run()
sched.start()


