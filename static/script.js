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

function updateSiteResults(responseArray) {
    const sizeOfResponse = responseArray.length;

    for (let i = 1; i <= 10; i++) {
        resultNum = 'result' + i;
        checkboxNum = resultNum + 'checkbox';
        labelNum = resultNum + 'label';

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