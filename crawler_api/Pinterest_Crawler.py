from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.support import ui
import json

#MOZE BY SPRAWDZIC CZY FAKTYCZNIE UNIKALNE HEHZ -> lista set
#zeby sie odpalal raz na 24 h

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
        email.send_keys("IoT.agh123@gmail.com")
        password.send_keys("qwerty#1234")
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
            #print(i.get("src"))
            url_image.append(i.get('src'))
        urls = soup.find_all("img", {"class": "hCL kVc L4E MIw"})
        # url_image = url_image.__getattr__("img")
        for i in urls:
            #print(i.get("src"))
            url_image.append(i.get('src'))
        # url_image = url_image['href']
        # print(url_image)
        return url_image[0]

    def update_data(self, pin_ids, pin_urls, keyword):
        data = {'Pinterest_data_'+keyword: []}
        for ids, url in zip(pin_ids, pin_urls):
            data['Pinterest_data_'+keyword].append({
                'pin_id': ids,
                'pin_url': url
            })
        #print(len(data['YT_data_high']))
        with open('Data/Pinterest_data_' + keyword + '.txt', 'w') as outfile:
            json.dump(data, outfile)
        print("THE END OF UPDATING: "+keyword)

    # def get_pins(self, browser, keyword):
    #     pins_urls = []
    #     pins_ids = []
    #     data = {'Pinterest_data_' + keyword: []}
    #     pin_counter = 0
    #     pin_amount = 500
    #     i = 0
    #     url = "https://pl.pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
    #         keyword) + "%7Ctyped"
    #     browser.get(url)
    #     while browser.current_url != url:
    #         print("EH")
    #         browser.get(url)
    #     wait = ui.WebDriverWait(browser, 10)
    #     wait.until(self.page_is_loaded)
    #
    #     beginning = time.time()
    #     end = time.time()
    #     while pin_counter < pin_amount and beginning - end < 10:
    #         beginning = time.time()
    #         soup = BeautifulSoup(browser.page_source, "html.parser")
    #         for pins in soup.find_all("a", {"data-force-refresh": "1"}):
    #             i += 1
    #             id = str(pins.get("href"))
    #             id = id[5:len(id)-1]
    #             #print(id)
    #             pins_ids.append(id)
    #         browser.execute_script("window.scrollBy(0,300)")
    #     print(i)  # licznik pinów
    #
    #     pins_ids = set(pins_ids)
    #     for pin in pins_ids:
    #         pins_urls.append(self.get_image_url(browser, pin))

    #    return pins_ids, pins_urls

    def get_data(self, browser, keywords):
        i = 0
        pin_ids = []
        pin_urls = []

        for keyword in keywords:
            url = "https://pl.pinterest.com/search/pins/?q=" + str(keyword) + "&rs=typed&term_meta[]=" + str(
                keyword) + "%7Ctyped"
            browser.get(url)
            while browser.current_url != url:
                print("EH")
                browser.get(url)
            wait = ui.WebDriverWait(browser, 10)
            wait.until(self.page_is_loaded)
            beginning = time.time()
            end = time.time()

            pin_counter = 0
            pin_amount = 500

            while pin_counter < pin_amount and beginning - end < 10:
                beginning = time.time()
                soup = BeautifulSoup(browser.page_source, "html.parser")
                for pins in soup.find_all("a", {"data-force-refresh": "1"}):
                    #print(pins)
                    try:
                        if pins.get("href") is not None and pins.find("img", {"class": "hCL kVc L4E MIw"}).get("src") is not None:

                            #print(pins.get("href"))
                            id = str(pins.get("href"))
                            id = id[5:len(id)-1]
                            pin_ids.append(id)

                            url = pins.find("img", {"class": "hCL kVc L4E MIw"})
                            url = url.get("src")
                            pin_urls.append(url)
                            #print(url)

                            i += 1
                    except:
                        print("Some pins are naughty!")

                browser.execute_script("window.scrollBy(0,300)")

        print(i)  # licznik pinów

        return pin_ids, pin_urls


def main():
    p = PinCrawling()

    browser = webdriver.Firefox(executable_path='Data/geckodriver-v0.26.0-linux64/geckodriver')
    p.login(browser)

    low = ["horror"]
    high = ["cute"]

    pins_ids, pins_urls = p.get_data(browser, low)
    p.update_data(pins_ids, pins_urls, "low")

    pins_ids, pins_urls = p.get_data(browser, high)
    p.update_data(pins_ids, pins_urls, "high")

    browser.close()


main()
