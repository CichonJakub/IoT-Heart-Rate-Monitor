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
        print("Teleport Successful!")

    def get_image_url(self, pin_id):
        url = "https://pl.pinterest.com/pin/" + pin_id
        page = self.s.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')
        url_database = []
        #print(soup)
        #print(soup.prettify())
        #print(soup.find_all("meta"))
        #print(soup.find_all("meta", attrs={'name': 'og:image'}))
        url_image = soup.find_all("meta", attrs={'name': 'og:image'})
        for i in url_image:
            print(i.get('content'))
            url_database.append(i.get('content'))
        return url_database


def main():
    p = PinCrawling()

    browser = webdriver.Firefox(executable_path='Data/geckodriver-v0.26.0-linux64/geckodriver')
    p.login(browser)




main()

