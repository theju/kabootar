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
    var date = new Date();
    var bucketDate = formatDate(date);
    riak.save("analytics_" + bucketDate, action + "_" + value + "_" + date.getTime() + "_" + randomSuffix, 
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

app.get("/dashboard/data/", function(req, res) { 
    var defaultDate = formatDate(new Date());
    var reqDate = req.query.hasOwnProperty("date")?req.query.date:defaultDate;
    riak.add("analytics_" + reqDate).map(mapFn).reduce(reduceFn).run(function(err, result) { 
	res.send(result);
    });
});

function mapFn(v) {
    var jsonData = JSON.parse(v.values[0].data);
    var mapObj = new Object();
    mapObj[_.keys(jsonData)[0]] = 1;
    return [mapObj];
}

function reduceFn(values, args) {
    var result = {};
    _.each(values, function(mapObj) { 
	_.each(mapObj, function(val, key, list) {
	    if (!result.hasOwnProperty(key)) {
		result[key] = 0;
	    }
	    result[key] += parseInt(val);
	});
    });
    return [result];
}

function formatDate(date) {
    return date.toJSON().split("T")[0].split("-").join("");
}

app.listen(8000);
