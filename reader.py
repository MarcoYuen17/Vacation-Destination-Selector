import pandas as pd
import sys

dataframe = pd.read_csv('places_descriptions.csv')

dictionary_from_dataframe = dataframe.to_dict()
dictionary = {}

i = 0
places = dictionary_from_dataframe.get('Place')
while i < len(places):
    place = places[i]
    description = dictionary_from_dataframe.get('Description')[i]
    dictionary[place] = description
    i += 1

def findCountriesWithKeyword(keyword):
    countries = []
    for country in dictionary:
        if (keyword in dictionary[country]):
            countries.append(country)
    return countries

keyword = sys.argv[1]
print(findCountriesWithKeyword(keyword))
sys.stdout.flush()

#Might be better to leave data with indices that way easier to recommend

#still have checklist option + random selector from list