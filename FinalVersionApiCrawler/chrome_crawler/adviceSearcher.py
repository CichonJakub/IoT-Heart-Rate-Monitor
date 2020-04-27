import selenium.webdriver as webdriver
import os
from bs4 import BeautifulSoup
from selenium.webdriver.support import ui
import time


def page_is_loaded(browser):
    return browser.find_element_by_tag_name("body") != None


def get_results(search_term):
    url = "https://www.startpage.com"
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    browser = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"),
                                   chrome_options=chrome_options)
    browser.get(url)
    if browser.current_url != url:
        browser.get(url)
    wait = ui.WebDriverWait(browser, 10)
    wait.until(page_is_loaded)
    search_box = browser.find_element_by_id("q")
    search_box.send_keys(search_term)
    search_box.submit()
    time.sleep(3)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    next = True
    results = []
    i=0
    max = 23
    #print("Crawling for porady started!")
    while next and i < max:
        links = soup.find_all("a", {"class": "w-gl__result-title"})
        for link in links:
            if i < max:
                href = link.get('href')
                results.append(href)
                i = i + 1

        try:
            browser.find_element_by_class_name("pagination__next-prev-button.next").submit()
            time.sleep(3)
            soup = BeautifulSoup(browser.page_source, 'html.parser')
        except:
            next = False
    #print("Zaleziono porad: "+str(len(results)))
    # print("Porady")
    # print(results)
    browser.quit()
    return results

