(function() {
    var host = "http://localhost:8000";
    var dataList = [{"Page_Load_Start": _page_load_start}, 
		    {"Page_Load_End": window._page_load_end}];
    var strData = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + "/beam/", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    for (var i = 0; i < dataList.length; i++) {
	for (var j in dataList[i]) {
	    strData += ((i > 0)?"&":"") + encodeURI('action='+ j + '&value=' + dataList[i][j]);
	}
    }
    xhr.send(strData);
})();
