from flask import Flask, render_template, request, redirect, Response
import random, json
import pandas as pd

app = Flask(__name__)

dataframe = pd.read_csv('places_descriptions.csv') #TODO: add README

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

# Renders the webpage upon loading
@app.route('/')
def renderPage():
    return render_template('front.html')

# Handles incoming POST request and dispatches information to functions
@app.route('/post_receiver', methods = ['POST'])
def handlePOSTRequest():
    requestByteLiteral = request.get_data()
    requestStringJson = requestByteLiteral.decode('utf-8')
    jsonObject = json.loads(requestStringJson)

    data = jsonObject['information']
    functionName = jsonObject['operation']

    response = 'There was an error during function dispatch.'

    if functionName == 'recommendGivenKeyword':
        response = recommendGivenKeyword(data)
    elif functionName == 'getPairRandomIndex':
        response = getPairRandomIndex(data)
    elif functionName == 'getDescriptionGivenPlace':
        response = getDescriptionGivenPlace(data)

    return response

# Returns array of countries with descriptions containing the given keyword
def recommendGivenKeyword(keyword):
    countries = []
    for country in dictionary:
        if (keyword in dictionary[country]):
            countries.append(country)
    
    recommendedArrayString = json.dumps(countries)
    
    return recommendedArrayString
    
# Given a random index, returns the place:description pair from the dictionary
def getPairRandomIndex(index):
    pair = list(dictionary.items())[index]
    place = pair[0]
    description = pair[1]

    pairArrayString = json.dumps([place, description])

    return pairArrayString
    
# For a given place, returns the description
def getDescriptionGivenPlace(place):
    description = dictionary.get(place)
    
    return description

# Runs the app
if __name__ == '__main__':
    app.run()