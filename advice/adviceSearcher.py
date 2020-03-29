import selenium.webdriver as webdriver


def get_results(search_term):
    url = "https://www.startpage.com"
    browser = webdriver.Chrome("drivers/chromedriver.exe")

    browser.get(url)
    search_box = browser.find_element_by_id("query")
    search_box.send_keys(search_term)
    search_box.submit()
    next = True
    results = set()
    while next:
        links = browser.find_elements_by_xpath("//section//div//a[@class='w-gl__result-url']")

        for link in links:
            href = link.get_attribute("href")
            results.add(href)

        try:
            browser.find_element_by_class_name("next").submit()
        except:
            next = False

    browser.quit()
    return results


# Add data into an existing file
def append_to_file(keyword, data):
    with open('Advice_data_' + keyword + '.txt', 'a') as file:
        file.write(data + '\n')


urls = get_results("jak obnizyc puls")
for url in urls:
    append_to_file('high', url)