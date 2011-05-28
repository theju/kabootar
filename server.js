var express = require("express");
var path = require("path");
var riak = require("riak-js").getClient();
var mustache = require("mustache");

var app = express.createServer(
    express.logger(),
    express.bodyParser(),
    express.static(__dirname)
);

var mu = {
    compile: function(viewStr, options) {
	return function() {
	    return mustache.to_html(viewStr, options);
	}
    }
};

app.post("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var action = req.body.action;
    var value  = req.body.value;
    var randomSuffix = Math.floor(Math.random() * 999999 + 1)
    riak.save("analytics", action + "_" + value + "_" + (new Date()).getTime() + "_" + randomSuffix, 
	      function() { 
		  var o = new Object();
		  o[action] = value;
		  return o;
	      }());
    res.send();
});

app.options("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send();
});

app.get("/dashboard/", function(req, res) { 
    app.register('html', mu);
    var dashboardTitle = "Kabootar Dashboard : Homing back interesting data";
    res.render("dashboard.html", {title: dashboardTitle});
});

app.listen(8000);
