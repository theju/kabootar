var express = require("express");
var path = require("path");

var app = express.createServer(
    express.logger(),
    express.bodyParser(),
    express.static(__dirname)
);

app.post("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(null);
});

app.options("/beam/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(null);
});

app.listen(8000);

