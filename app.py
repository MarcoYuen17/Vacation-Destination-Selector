from flask import Flask, render_template, request, redirect, Response
import random, json
import pandas as pd

app = Flask(__name__)

dataframe = pd.read_csv('places_descriptions.csv')

dictionary_from_dataframe = dataframe.to_dict()
dictionary = {}

# Initializes dictionary to contain places and associated descriptions
i = 0
places = dictionary_from_dataframe.get('Place')
while i < len(places):
    place = places[i]
    description = dictionary_from_dataframe.get('Description')[i]
    dictionary[place] = description
    i += 1

# Returns array of countries with descriptions containing the given keyword
def findCountriesWithKeyword(keyword):
    countries = []
    for country in dictionary:
        if (keyword in dictionary[country]):
            countries.append(country)
    return countries

# Renders the webpage upon loading
@app.route('/')
def renderPage():
    return render_template('front.html')

# Processes the submitKeyword() POST request from script.js
@app.route('/receiver', methods = ['POST'])
def recommendGivenKeyword():
    requestByteLiteral = request.get_data()
    requestStringJson = requestByteLiteral.decode('utf-8')
    keywordJson = json.loads(requestStringJson)
    keyword = keywordJson['keyword']

    responseList = findCountriesWithKeyword(keyword)
    response = json.dumps(responseList)
    
    return response

# Runs the app
if __name__ == '__main__':
    app.run()