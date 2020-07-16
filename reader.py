from flask import Flask, render_template, request, redirect, Response
import random, json
import pandas as pd
# import sys

app = Flask(__name__)

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

# keyword = sys.argv[1]
# print(findCountriesWithKeyword(keyword))
# sys.stdout.flush()

@app.route('/')
def renderPage():
    return render_template('front.html')

@app.route('/receiver', methods = ['POST'])
def recommendGivenKeyword():
    # keyword = request.get_json()      #Call a helper function
    # return keyword
    return 'Request received on port 5000'

if __name__ == '__main__':
    app.run()