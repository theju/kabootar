var host = "http://localhost:8000";

function recordData(action, value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + "/beam/", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    strData = encodeURI('action='+ action + '&value=' + value);
    xhr.send(strData);
}

(function() {
    var dataList = [{"Page_Load_Start": _page_load_start}, 
		    {"Page_Load_End": window._page_load_end}];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + "/beam_load/", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var strData = "";
    for (var i = 0; i < dataList.length; i++) {
	for (var j in dataList[i]) {
	    strData += encodeURI((i > 0?"&":"") + 'action='+ j + '&value=' + dataList[i][j]);
	}
    }
    xhr.send(strData);
})();
