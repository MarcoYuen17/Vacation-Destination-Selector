window.onload = function() {
    document.getElementById('submitKeywordButton').onclick = function() {
        submitKeyword();
    }
};

function submitKeyword() {
    const sample = {keyword: "warm"};
    const sampleJson = JSON.stringify(sample);
    let keyword = document.getElementById('kind').value;
    $.post("receiver", sampleJson, function(response) {
        console.log(response);
    });
    event.preventDefault();
}