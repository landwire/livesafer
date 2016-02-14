var express = require('express');
var app = express();
var fs = require("fs");
var obj;


app.get('/', function (req, res) {
	var response = 'Hello Fucker';
	res.send(response);
});

app.get('/test', function (req, res) {
  	var response = 'TEST!!!';
	res.send(response);
});

app.get('/read', function (req, res) {
  	// Asynchronous read
  	fs.readFile('input.txt', function (err, data) {
  	   	if (err) {
  	       return console.error(err);
  	   	}
  	   	//make data JSON
  	   	obj = JSON.parse(data);
  	   	// data is just text here!!!
  	   	res.send("Asynchronous read: " + data);
  	});

});



var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
