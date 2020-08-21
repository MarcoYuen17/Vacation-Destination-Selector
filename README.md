# Vacation Destination Selector
- Web application which recommends a country as a vacation destination based on a keyword input of the user's choice
- Vacation destination data scraped from https://www.roamright.com/country/list/

### Main screen:
![](readme_app_pictures/main_screen.png 'Main Screen')

#### Click "Go Anywhere!":
![](readme_app_pictures/click_random.png 'Click "Go Anywhere!"')

#### After clicking "Go Anywhere!" (see output at bottom of photo):
![](readme_app_pictures/clicked_random.png 'A random place from the entire list of places')

#### Enter "water" as a keyword:
![](readme_app_pictures/go_to_place_water.png 'Enter "water" as keyword input')

#### Click "Submit" after entering "water" as a keyword:
![](readme_app_pictures/water_results.png 'Results for "water" keyword (on left side)')

#### Select some places from the results list:
![](readme_app_pictures/select_some_places.png 'Select some places')

#### Click "Add above places to selections":
![](readme_app_pictures/places_selected.png 'Selected places (on right side)')

#### Click "Go anywhere from my selections!" (see output at bottom of photo):
![](readme_app_pictures/clicked_random_from_list.png 'A random place from the selections list')

#### Click "Go anywhere from my selections!" again (see output at bottom of photo):
![](readme_app_pictures/clicked_random_from_list_2.png 'Another random place from the selections list')

## Features:
- Can obtain a completely random country for vacation
- Can find a list of countries given a keyword input
    - Can add/remove these countries from the list of selections
- Can obtain a random country for vacation from the list of selections

## Usage:
- Run app.py to start the application
- Navigate to 127.0.0.1:5000 to view the user interface

- Run scraper.py to scrape https://www.roamright.com/country/list/ and update the country data set