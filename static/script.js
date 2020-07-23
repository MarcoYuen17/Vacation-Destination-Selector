const updateSelectionErrorId = 'update_selection_error'
let activeSelections = [];

// Submits inputted keyword to app.py and returns response to webpage
async function submitKeyword() {
    event.preventDefault();
    const keyword = document.getElementById('kind').value;
    const jsonToSend = {keyword: keyword};
    const jsonStringToSend = JSON.stringify(jsonToSend);

    const appResponse = await $.post('receiver', jsonStringToSend, function(response) {
        return response;
    });
    appResponseArray = JSON.parse(appResponse);
    updateSiteResults(appResponseArray);
}

// Updates "Results" region of webpage
function updateSiteResults(responseArray) { //TODO: Add more space in HTML if there are many results
    const sizeOfResponse = responseArray.length;

    for (let i = 1; i <= 10; i++) {
        const resultNum = 'result' + i;
        const checkboxNum = resultNum + 'checkbox';
        const labelNum = resultNum + 'label';

        if (i <= sizeOfResponse) {
            document.getElementById(checkboxNum).style.visibility = 'visible'; //TODO: Replace with JQuery?

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
                const displayErrorElement = document.getElementById(updateSelectionErrorId);
                displayErrorElement.innerHTML = 'Some places were not added to the selections because there are now 10 selections. Please remove some before adding more.';
                displayErrorElement.style.visibility = 'visible';
                break;
            }

            const selectionNum = 'selection' + (i + firstOpenSpot);
            const selectionElement = document.getElementById(selectionNum);

            const place = places[i]
            selectionElement.innerHTML = place;
            selectionElement.style.visibility = 'visible';
            activeSelections.push(place);
        }
    } else {
        document.getElementById(updateSelectionErrorId).innerHTML = 'There are already 10 selections. Please remove some before adding more.'
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
function returnRandomFromSelections() {
    const numCurrentSelections = activeSelections.length;
    if (numCurrentSelections === 0) {
        document.getElementById('place_result').innerHTML = "There aren't any places in the selections list!";
    } else {
        const randomNumber = getRandomNumber(numCurrentSelections);
        document.getElementById('place_result').innerHTML = activeSelections[randomNumber];
    }
    makeResultVisible();    
}

// Helper function for returnRandomFromSelections()
// Returns a random number from 0 to a given number, not including the given number
function getRandomNumber(maximum) {
    return Math.floor(Math.random() * maximum);
}

// Helper function for returnRandomFromSelections()
// Changes visibility of result of returnRandomFromSelections() to be visible on the webpage
function makeResultVisible() {
    const elements = document.getElementsByClassName('returned_result');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = 'visible';
    }
}

function returnRandom() {
    //stub
}
