from selenium import webdriver
import os
from bs4 import BeautifulSoup
import time
from selenium.webdriver.support import ui
import numpy as np


class PinCrawling:

    def __init__(self):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"),
                                  chrome_options=chrome_options)

    def page_is_loaded(self, driver):
        return driver.find_element_by_tag_name("body") != None

    def login(self, driver):
        if driver.current_url != "https://www.pinterest.com/login/?referrer=home_page":
            driver.get("https://www.pinterest.com/login/?referrer=home_page")
        wait = ui.WebDriverWait(driver, 10)
        wait.until(self.page_is_loaded)
        email = driver.find_element_by_xpath("//input[@type='email']")
        password = driver.find_element_by_xpath("//input[@type='password']")
        time.sleep(3)
        email.send_keys("email") 
        time.sleep(3)
        password.send_keys("haslo")
    
        time.sleep(3)
        password.submit()
        time.sleep(3)
        print("You are logged in Pinterest !")

    def get_data(self, driver, keywords):
        pin_ids = []
        pin_urls = []

        for keyword in keywords:
            url = "https://pl.pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
                keyword) + "|typed"
            driver.get(url)
            while driver.current_url != url:
                driver.get(url)
            wait = ui.WebDriverWait(driver, 10)
            wait.until(self.page_is_loaded)
            beginning = time.time()
            end = time.time()

            pin_counter = 0
            pin_amount = 300
            #print("Crawling for photos started!")
            while pin_counter < pin_amount and beginning - end < 20:
                beginning = time.time()
                soup = BeautifulSoup(driver.page_source, "html.parser")
                for pins in soup.find_all("a", {"data-force-refresh": "1"}):
                    try:
                        if pins.get("href") is not None and pins.find("img", {"class": "hCL kVc L4E MIw"}).get(
                                "src") is not None:
                            id = str(pins.get("href"))
                            id = id[5:len(id) - 1]
                            pin_ids.append(id)

                            url = pins.find("img", {"class": "hCL kVc L4E MIw"})
                            url = url.get("src")
                            pin_urls.append(url)
                            pin_counter = pin_counter+1
                    except:
                        info = "Some pins are naughty!"
                        #print(info)

                driver.execute_script("window.scrollBy(0,300)")

        np.unique(pin_urls)
        #print("Znaleziono pinow: "+str(len(pin_urls)))
        # print("Linki: ")
        # print(pin_urls)
        return pin_urls

#
# def main():
#     p = PinCrawling()
#
#     p.login(p.driver)
#
#     low = ["horror"]
#     high = ["cute"]
#
#     pins_ids = p.get_data(p.driver, low)
#
#     pins_ids = p.get_data(p.driver, high)
#
#     print(pins_ids)
#     p.driver.close()

    # def get_image_url(self, driver, pin_id):
    #     url = "https://pl.pinterest.com/pin/" + pin_id
    #     print(url)
    #     driver.get(url)
    #     while driver.current_url != url + "/":
    #         #print("EH")
    #         driver.get(url + "/")
    #     wait = ui.WebDriverWait(driver, 10)
    #     wait.until(self.page_is_loaded)
    #
    #     url_image = []
    #     soup = BeautifulSoup(driver.page_source, 'html.parser')
    #     urls = soup.find_all("img", {"class": "GrowthUnauthPinImage__Image"})
    #     # url_image = url_image.__getattr__("img")
    #     for i in urls:
    #         # print(i.get("src"))
    #         url_image.append(i.get('src'))
    #     urls = soup.find_all("img", {"class": "hCL kVc L4E MIw"})
    #     # url_image = url_image.__getattr__("img")
    #     for i in urls:
    #         # print(i.get("src"))
    #         url_image.append(i.get('src'))
    #     # url_image = url_image['href']
    #     # print(url_image)
    #     return url_image[0]

#main()
