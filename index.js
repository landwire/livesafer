var express = require('express');
var app = express();
var fs = require("fs");
var obj;


app.get('/', function (req, res) {
	var response = 'Welcome to Lyfee Safer - guarding over you and your loved ones.';
	res.send(response);
});

app.get('/test', function (req, res) {
  	var response = 'TEST!!!';
	res.send(response);
});

app.get('/monitor', function (req, res) {
  	// Asynchronous read
  	/*
  	fs.readFile('input.txt', function (err, data) {
  	   	if (err) {
  	       return console.error(err);
  	   	}
  	   	//make data JSON
  	   	obj = JSON.parse(data);
  	   	// data is just text here!!!
  	   	res.send("Asynchronous read: " + data);
  	});*/
	
	
  	// relayr
  	var Relayr = require('relayr');
  	var app_id = "{ebe9f40a-f6df-4760-8c43-1c8a35fd50f8}";
  	var dev_id = "9af8642a-65e1-4b9b-b255-515268ae38b5";
  	var token  = "VFxQi3GrH1R-FxXf8jcRJ-lQlN1N3xuA";

  	var relayr = new Relayr(app_id);

  	/*
  	relayr.deviceModel(token, dev_id, function (err, description) {
  	    console.log("-------------- BSH --------------------");
  	    console.log(description);
  	    console.log("----------------------------------------------------------");
  	});
  	*/

  	relayr.connect(token, dev_id);
  	/*
  	relayr.on("data", function (topic, msg) {
  	    console.log(topic + ":" + msg);
  	});
  	*/
  	relayr.on("connect", function () {
  	 console.log("connected");
  	});

  	setTimeout(function() {
  	    console.log('Waited 3 seconds');
  	}, 3000);

});



var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
