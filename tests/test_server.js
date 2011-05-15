var express = require("express");
var path = require("path");
var riak = require("riak-js").getClient();
var us = require("underscore");

var app = express.createServer(
    express.logger(),
    express.bodyParser(),
    express.static(path.dirname(__dirname))
);

app.post("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var actionList = req.body.action;
    var valueList  = req.body.value;
    var tmpList = us.zip(actionList, valueList);
    var pageLoadTime = us.reduce(valueList, function(a, b) { 
	return a - b; 
    });
    riak.save("analytics", "Page_Load_" + valueList.sort()[0], 
	      {"loadTime": (pageLoadTime < 0?-1:1) * pageLoadTime});
    res.send();
});

app.options("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send();
});

app.listen(8000);

