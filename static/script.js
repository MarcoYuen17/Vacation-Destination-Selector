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
// Adds individual place names to "Selections" region of webpage or adds error message if no spaces left
function addPlacesToSelections(places) {
    const firstOpenSpot = findFirstOpenSpot();
    if (firstOpenSpot > 0) {
        const numOpenSpots = 10 - firstOpenSpot + 1; //10 is number of total spots, +1 is to include first open spot
        for (let i = 0; i < numOpenSpots; i++) {

            if (i >= places.length) {
                break;
            }

            const selectionNum = 'selection' + (i + firstOpenSpot);
            const selectionElement = document.getElementById(selectionNum);

            selectionElement.innerHTML = places[i];
            selectionElement.style.visibility = 'visible'
        }
    } else {
        //TODO: print "no more spots" on page
    }
}

// Helper function for addPlacesToSelections()
// Finds first empty HTML element in "Selections" region of webpage
function findFirstOpenSpot() {
    for (let i = 1; i <= 10; i++) {
        const selection = 'selection' + i;
        const element = document.getElementById(selection).innerHTML;
        if (!element || element === 'undefined') {
            return i;
        }
    }
    return -1; // No open spot
}

function returnRandomFromSelections() {
    //stub
}

function returnRandom() {
    //stub
}
