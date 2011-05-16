var express = require("express");
var path = require("path");
var riak = require("riak-js").getClient();

var app = express.createServer(
    express.logger(),
    express.bodyParser(),
    express.static(path.dirname(__dirname))
);

app.post("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var action = req.body.action;
    var value  = req.body.value;
    var randomSuffix = Math.floor(Math.random() * 999999 + 1)
    riak.save("analytics", action + "_" + value + "_" + (new Date()).getTime() + "_" + randomSuffix, 
	      function() { 
		  var o = new Object;
		  o[action] = value;
		  return o;
	      }());
    res.send();
});

app.options("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send();
});

app.listen(8000);
