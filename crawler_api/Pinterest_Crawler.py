from bs4 import BeautifulSoup
import requests
from requests import Session
from selenium import webdriver
import urllib.request
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.support import ui
import threading
import json

from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary


class PinCrawling:

    def page_is_loaded(self, browser):
        return browser.find_element_by_tag_name("body") != None

    def login(self, browser):  # trzeba byc zalogowanym  na Pinterescie
        if browser.current_url != "https://www.pinterest.com/login/?referrer=home_page":
            browser.get("https://www.pinterest.com/login/?referrer=home_page")
        wait = ui.WebDriverWait(browser, 10)
        wait.until(self.page_is_loaded)
        email = browser.find_element_by_xpath("//input[@type='email']")
        password = browser.find_element_by_xpath("//input[@type='password']")
        email.send_keys("rozanna.boczar@gmail.com")
        password.send_keys("miro2010")
        # driver.find_element_by_xpath("//div[@data-reactid='30']").click()
        password.submit()
        time.sleep(3)
        print("You are logged in <3 !")

    def get_image_url(self, browser, pin_id):
        url = "https://pl.pinterest.com/pin/" + pin_id
        print(url)
        browser.get(url)
        while browser.current_url != url+"/":
            print("EH")
            browser.get(url+"/")
        wait = ui.WebDriverWait(browser, 10)
        wait.until(self.page_is_loaded)
        url_image = []
        soup = BeautifulSoup(browser.page_source, 'html.parser')
        urls = soup.find_all("img", {"class": "GrowthUnauthPinImage__Image"})
        # url_image = url_image.__getattr__("img")
        for i in urls:
            print(i.get("src"))
            url_image.append(i.get('src'))
        urls = soup.find_all("img", {"class": "hCL kVc L4E MIw"})
        # url_image = url_image.__getattr__("img")
        for i in urls:
            print(i.get("src"))
            url_image.append(i.get('src'))
        # url_image = url_image['href']
        # print(url_image)
        return url_image[0]

    def update_data(self, data, keyword):
        with open('Data/Pinterest_data_' + keyword + '.txt', 'w') as outfile:
            json.dump(data, outfile)

    # def get_pin_ids(self, browser, keyword):
    #     pin_ids = []
    #     browser.get("https://pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
    #         keyword) + "%7Ctyped")
    #     print("started scrapping pin ids")
    #     get_pic_counter = 0
    #     time.sleep(5)
    #
    #     while (get_pic_counter < len()):
    #     return pin_ids
    #
    def get_pins(self, browser, keyword):
        pins_urls = []
        pins_ids = []
        data = {'Pinterest_data_' + keyword: []}
        pin_counter = 0
        pin_amount = 1000

        browser.get("https://pl.pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
            keyword) + "%7Ctyped")
        # wait = ui.WebDriverWait(browser, 40)
        # wait.until(self.page_is_loaded)
        i = 0

        # SCROLL_PAUSE_TIME = 0.5
        #
        # # Get scroll height
        # last_height = browser.execute_script("return document.body.scrollHeight")
        #
        # while True:
        #     # Scroll down to bottom
        #     browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        #
        #     # Wait to load page
        #     time.sleep(SCROLL_PAUSE_TIME)
        #
        #     # Calculate new scroll height and compare with last scroll height
        #     new_height = browser.execute_script("return document.body.scrollHeight")
        #     if new_height == last_height:
        #         break
        #     last_height = new_height
        #     soup = BeautifulSoup(browser.page_source, "html.parser")
        #     a = soup.find_all("a", {"data-force-refresh": "1"})
        #
        #     for pin in a:
        #         pins_urls.append(pin["href"])
        #         print(pin["href"])
        #         i += 1
        #
        # print(i)

        # beginning = time.time()
        # end = time.time()
        #
        # while pin_counter < pin_amount and beginning - end < 30:
        #     beginning = time.time()
        #
        # for ids, url in zip(pins_ids, pins_urls):
        #     data['Pinterest_data_'+keyword].append({
        #         'pin_id': ids,
        #         'pin_url': url
        #     })
        # print(len(data['YT_data_'+keyword]))
        # return pins_ids, pins_urls


def main():
    p = PinCrawling()

    browser = webdriver.Firefox(executable_path='Data/geckodriver-v0.26.0-linux64/geckodriver')
    p.login(browser)

    low = ["scary", "funny"]
    high = ["cute", "views"]

    # p.get_pins(browser, "scary")

    eh = p.get_image_url(browser, "598908450433466234")
    print("NIHIHI")
    print(eh)
    # for item in low:
    #     print("started updating low")
    #     keyword = item
    #     #browser.get("https://pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
    #     #   keyword) + "%7Ctyped")
    #     p.get_pins(browser, keyword)

    # for item in high:
    #     print("started updating high")
    #     keyword = item
    #     browser.get("https://pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
    #         keyword) + "%7Ctyped")
    #     t2 = threading.Thread(target=get_pic, args=(valid_urls, driver2,))
    #     t2.setDaemon(True)
    #     t2.start()

    # time.sleep(3)

    # t1.join()
    # t2.join()


main()
