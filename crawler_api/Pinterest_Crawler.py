from bs4 import BeautifulSoup
import requests
import urllib.request


class PinCrawling:

    def get_image_url(pin_id):
        url = "https://pl.pinterest.com/pin/" + pin_id
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')
        url_database = []
        #print(soup)
        #print(soup.prettify())
        #print(soup.find_all("meta"))
        #print(soup.find_all("meta", attrs={'name': 'og:image'}))
        url_image = soup.find_all("meta", attrs={'name': 'og:image'})
        for i in url_image:
            print(i.get('content'))
            url_image.append(i.get('content'))
        return url_image