var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
//var util = require('util');
//var file = '/data/clients.json';
var fs = require('fs');
var Debug = require('debug');
var debug = Debug('main');


var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = '/tmp/my.json';

app.get('/', function (req, res) {
    var response = ''
	fs.readFile("foo.txt", "utf8", function(error, data) {
	  response = data;
	});
	response = response + 'Hello Fucker';
	res.send(response);
});

app.get('/test', function (req, res) {
	console.log('/test');
    fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + outputFilename);
	    }
	}); 
});
/*
// get data from relayr.io
var relayr_get = function(deviceId) {
	console.log('relayr.get');
	return 50;
};

var record_device_data = function(deviceId) {
	// write data to JSON file
	
}

// call relayr every 5 seconds
var allDevices = array('device1', 'device2');
var relayr_loop = function(allDevices) {
	foreach(allDevices as deviceId) {
		var temp = relayr_get();

	}
}
*/


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
