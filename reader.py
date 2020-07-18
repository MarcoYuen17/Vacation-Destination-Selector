from flask import Flask, render_template, request, redirect, Response
import random, json
import pandas as pd

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

@app.route('/')
def renderPage():
    return render_template('front.html')

@app.route('/receiver', methods = ['POST'])
def recommendGivenKeyword():
    requestByteLiteral = request.get_data()      #Call a helper function to determine what to return
    requestStringJson = requestByteLiteral.decode('utf-8')
    keywordJson = json.loads(requestStringJson)
    keyword = keywordJson['keyword']
    print(keyword)

    return 'Request received: ' + keyword

if __name__ == '__main__':
    app.run()