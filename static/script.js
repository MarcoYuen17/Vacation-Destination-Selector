const updateSelectionErrorId = 'update_selection_error';
const placeResultId = 'place_result';
const descriptionResultId = 'description_result';
let activeSelections = [];

// Submits inputted keyword to app.py and returns response to webpage
async function submitKeyword() {
    event.preventDefault();
    const keyword = document.getElementById('kind').value;

    const appResponse = await doPOSTRequest('recommendGivenKeyword', keyword);
    appResponseArray = JSON.parse(appResponse);

    updateSiteResults(appResponseArray);
}

// Updates "Results" region of webpage
function updateSiteResults(responseArray) {
    const sizeOfResponse = responseArray.length;

    for (let i = 1; i <= 10; i++) {
        const resultNum = 'result' + i;
        const checkboxNum = resultNum + 'checkbox';
        const labelNum = resultNum + 'label';

        if (i <= sizeOfResponse) {
            document.getElementById(checkboxNum).style.visibility = 'visible';

            resultToAdd = responseArray[i-1];
            document.getElementById(labelNum).innerHTML = resultToAdd;
        } else {
            document.getElementById(checkboxNum).style.visibility = 'hidden';

            document.getElementById(labelNum).innerHTML = '';
        }
    }
}

// Updates "Selections" region of webpage
function updateSelections() {
    event.preventDefault();

    let placesToAdd = [];
    for (let i = 1; i <= 10; i++) {
        const resultNum = 'result' + i;
        const checkboxNum = resultNum + 'checkbox';
        const isCheckBoxChecked = document.getElementById(checkboxNum).checked;
        
        if (isCheckBoxChecked) {
            place = document.getElementById(resultNum + 'label').innerHTML;
            placesToAdd.push(place);
        }

    }
    addPlacesToSelections(placesToAdd);
}

// Helper function for updateSelections()
// Displays individual place names to "Selections" region of webpage or adds error message if no spaces left
function addPlacesToSelections(places) {
    const firstOpenSpot = findFirstOpenSpot();
    if (firstOpenSpot > 0) {
        const numOpenSpots = 10 - firstOpenSpot + 1; //10 is number of total spots, +1 is to include first open spot
        for (let i = 0; i <= numOpenSpots; i++) {

            if (i >= places.length) {
                break;
            } else if (i === numOpenSpots) {
                updateSelectionError('Some places were not added to the selections because there are now 10 selections. Please remove some before adding more.', 'visible');
                break;
            }

            const selectionNum = 'selection' + (i + firstOpenSpot);
            const selectionElement = document.getElementById(selectionNum);
            const selectionContainerElement = document.getElementById(selectionNum + '_container');

            const place = places[i]
            selectionElement.innerHTML = place;
            selectionContainerElement.style.visibility = 'visible';

            activeSelections.push(place);
        }
    } else {
        updateSelectionError('There are already 10 selections. Please remove some before adding more.', 'visible');
    }
}

// Helper function for addPlacesToSelections()
// Finds first empty HTML element in "Selections" region of webpage
function findFirstOpenSpot() {
    for (let i = 1; i <= 10; i++) {
        const selection = 'selection' + i;
        const element = document.getElementById(selection).innerHTML;
        if (!element) {
            return i;
        }
    }
    return -1; // No open spot
}

// Chooses random place from activeSelections and displays it on the webpage
async function displayRandomFromSelections() {
    const numCurrentSelections = activeSelections.length;
    if (numCurrentSelections === 0) {
        displayResults("There aren't any places in the selections list!", '');
    } else {
        const randomNumber = getRandomNumber(numCurrentSelections);
        randomSelectedPlace = activeSelections[randomNumber];

        const appResponse = await doPOSTRequest('getDescriptionGivenPlace', randomSelectedPlace);

        displayResults(randomSelectedPlace, appResponse);
    }
    makeResultVisible();    
}

// Helper function for returnRandomFromSelections()
// Changes visibility of result of returnRandomFromSelections() to be visible on the webpage
function makeResultVisible() {
    const elements = document.getElementsByClassName('returned_result');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = 'visible';
    }
}

// Submits random index to app.py and displays the place at that index on the webpage
async function displayRandom() {
    const randomNumber = getRandomNumber(175) + 1; // Random number in the range of the number of countries in the .csv

    const appResponse = await doPOSTRequest('getPairRandomIndex', randomNumber);
    appResponseJson = JSON.parse(appResponse);

    place = appResponseJson[0];
    description = appResponseJson[1];

    displayResults(place, description);

    makeResultVisible();
}

// Helper function for displayRandom() & displayRandomFromSelections()
// Displays result place and description on the webpage
function displayResults(place, description) {
    document.getElementById(placeResultId).innerHTML = place;
    document.getElementById(descriptionResultId).innerHTML = description;
}

// Helper function for functions requiring communication with server
// Facilitates POST request
function doPOSTRequest(functionName, data) {
    const jsonToSend = {operation: functionName,
                        information: data};
    const jsonStringToSend = JSON.stringify(jsonToSend);
    
    return $.post('post_receiver', jsonStringToSend, function(response) {
        return response;
    });
}

// Helper function for returnRandomFromSelections() and returnRandom()
// Returns a random number from 0 to a given number, not including the given number
function getRandomNumber(maximum) {
    return Math.floor(Math.random() * maximum);
}

// Removes a place from the list of activeSelections and removes it from display on the webpage
function removeSelection(element) {
    element.innerHTML = '';

    const idNumRemoved = parseInt(element.id.substr('selection'.length), 10);
    activeSelections.splice(idNumRemoved - 1, 1);
    
    for (let i = idNumRemoved; i <= 10; i++) {
        const elementToBeReplaced = document.getElementById('selection' + i);
        const containerElementToBeReplaced = document.getElementById('selection' + i + '_container');
        if (i < 10) {
            const idNumToMoveUp = i + 1;
            const textToMoveUp = document.getElementById('selection' + idNumToMoveUp).innerHTML;
            if (!textToMoveUp) {
                containerElementToBeReplaced.style.visibility = 'hidden';
            } 
            elementToBeReplaced.innerHTML = textToMoveUp;
        } else {
            elementToBeReplaced.innerHTML = '';
            containerElementToBeReplaced.style.visibility = 'hidden';
        }
    }

    updateSelectionError('', 'hidden');
}

// Helper function for functions which manipulate the update_selection_error element
// Updates the text and visibility of the update_selection_error element
function updateSelectionError(newValue, newVisibility) {
    const displayErrorElement = document.getElementById(updateSelectionErrorId);
    displayErrorElement.innerHTML = newValue;
    displayErrorElement.style.visibility = newVisibility;
}