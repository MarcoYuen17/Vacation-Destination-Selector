from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

webdriver = webdriver.Chrome()
webdriver.get('https://www.roamright.com/country/list/')

content = webdriver.page_source
beautifulSoup = BeautifulSoup(content, features='html.parser')

places = []
descriptions = []

for div in beautifulSoup.findAll('div', attrs={'class': 'media-body'}):
    place = div.find('a')
    places.append(place.text)
    description_including_empties = div.find_all('p')
    for description in description_including_empties:
        if (description.text != ''):
            descriptions.append(description.text)


dataframe = pd.DataFrame({'Place':places, 'Description':descriptions})
dataframe.to_csv('places_descriptions.csv', index=False, encoding='utf-8')

webdriver.close()
