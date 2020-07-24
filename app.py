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
@app.route('/submit_keyword', methods = ['POST'])
def recommendGivenKeyword():
    requestByteLiteral = request.get_data() # TODO: Can abstract this out along with below function
    requestStringJson = requestByteLiteral.decode('utf-8')
    keywordJson = json.loads(requestStringJson)
    keyword = keywordJson['keyword']

    responseList = findCountriesWithKeyword(keyword)
    response = json.dumps(responseList)
    
    return response

# Processes the returnRandom() POST request from script.js
@app.route('/random_index', methods = ['POST'])
def getRandomIndex():
    requestByteLiteral = request.get_data()
    requestStringJson = requestByteLiteral.decode('utf-8')
    indexJson = json.loads(requestStringJson)
    index = indexJson['index']
    
    return getPairGivenIndex(index)

# Helper function for getRandomIndex()
# Returns the place:description pair of the given index from the dictionary
def getPairGivenIndex(index):
    pair = list(dictionary.items())[index]
    place = pair[0]
    description = pair[1]

    return json.dumps([place, description])

# For a given place, returns the description
@app.route('/get_description', methods = ['POST'])
def getDescriptionGivenPlace():
    requestByteLiteral = request.get_data()
    requestStringJson = requestByteLiteral.decode('utf-8')
    placeJson = json.loads(requestStringJson)
    place = placeJson['place']

    return dictionary.get(place)

# Runs the app
if __name__ == '__main__':
    app.run()