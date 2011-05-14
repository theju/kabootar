(function() {
    var data = {"Page_Load_Start": _page_load_start, 
		"Page_Load_End": window._page_load_end};
    for (var i in data) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8000/beam/", false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var startData = encodeURI('action='+ i + '&value=' + data[i]);
	xhr.send(startData);
    }
})();
