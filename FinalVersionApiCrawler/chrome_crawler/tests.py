import adviceSearcher as a
from YT_Search import *
from pinterest_crawler import *
import psycopg2 as pg
import validators
#pliki w heroku sa tylko read-only :'(


def porady_test():
    low = a.get_results("jak obnizyc puls")
    high = a.get_results("co na niski puls")
    # low_data = open("low_porady.txt", "w+")
    # for i in low:
    #     low_data.write(i)
    # low_data.close()
    # high_data = open("high_porady.txt", "w+")
    # for i in high:
    #     high_data.write(i)
    # high_data.close()
    i = 1
    for l in low: # ~54 wyniki
        print(str(i)+": "+l)
        i = i+1
    print("Liczba wynikow: "+ str(len(low)))
    print("SUGOI DESU NE~")
    i = 1
    for h in high: # ~68 wynikow
        print(str(i)+": "+h)
        i = i+1
    print("Liczba wynikow: " + str(len(high)))


def muzyka_test():
    yt = YTSearch()
    low = yt.update("low")
    high = yt.update("high")
    for l in low:
        print("https://www.youtube.com/watch?v="+l)
    print("Liczba wynikow: " + str(len(low)))
    print("SUGOI DESU NE~")
    for h in high:
        print("https://www.youtube.com/watch?v="+h)
    print("Liczba wynikow: " + str(len(high)))


def zdjecia_test():
    p = PinCrawling()

    p.login(p.driver)

    low = ["horror"]
    high = ["cute"]

    low = p.get_data(p.driver, low)
    high = p.get_data(p.driver, high)
    p.driver.close()

    for l in low:
        print(l)
    print("Liczba wynikow: " + str(len(low)))
    print("SUGOI DESU NE~")
    for h in high:
        print(h)
    print("Liczba wynikow: " + str(len(high)))


def check_urls():
    DATABASE_URL = os.environ[
        'DATABASE_URL'] = 'url'
    conn = pg.connect(DATABASE_URL, sslmode='require')
    c = conn.cursor()

    porady = "select link from porady"
    c.execute(porady)
    links = c.fetchall()
    print(links[0][0])

    for link in links:
        valid = validators.url(link[0])
        if valid==True:
            info = "Url is valid"
            print("Url is valid")
        else:
            info = "Url is not valid"
            print(info)
            # uruchamiamy advice search.py


def main():
    print("EH")
    # check_urls()
    #print("Porady")
    #porady_test()

    #print("Muzyka")
    #muzyka_test()

    #print("Zdjecia")
    #zdjecia_test()


#main()
