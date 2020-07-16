window.onload = function() {
    document.getElementById('submitKeywordButton').onclick = function() {
        submitKeyword();
    }
};

function submitKeyword() {
    let keyword = document.getElementById('kind').value;
    console.log(keyword);
    $.post("receiver", keyword, function(response) {
        console.log(response);
    });
    event.preventDefault();
}