function recordData(action, value) {
    var host = "http://localhost:8000";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + "/beam/", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    strData = encodeURI('action='+ action + '&value=' + value);
    xhr.send(strData);
}

(function() {
    recordData("Page_Load", window._page_load_end - _page_load_start);
})();
