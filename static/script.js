async function submitKeyword() {
    event.preventDefault();
    const sample = {keyword: "warm"};
    const sampleJson = JSON.stringify(sample);
    const keyword = document.getElementById('kind').value;

    const appResponse = await $.post("receiver", sampleJson, function(response) {
        return response;
    });
    appResponseArray = JSON.parse(appResponse);
    updateSiteResults(appResponseArray);
}

function updateSiteResults(responseArray) {
    const sizeOfResponse = responseArray.length;


    for (let i = 1; i <= sizeOfResponse; i++) {
        selection = 'result' + i + 'checkbox';
        document.getElementById(selection).style.visibility = 'visible';

        label = 'result' + i + 'label';
        resultToAdd = responseArray[i-1];
        document.getElementById(label).innerHTML = resultToAdd;
    }
}