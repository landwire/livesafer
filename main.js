var fs = require("fs");
var obj;
var Relayr = require('relayr');
var app_id = "{ebe9f40a-f6df-4760-8c43-1c8a35fd50f8}";
var dev_id = "9af8642a-65e1-4b9b-b255-515268ae38b5";
var token  = "VFxQi3GrH1R-FxXf8jcRJ-lQlN1N3xuA";

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   	if (err) {
       return console.error(err);
   	}
   	//make data JSON
   	obj = JSON.parse(data);

   	console.log("Asynchronous read: " + data);

   	// structure to loop over JSON objects
   	for (var key in obj) {
   	  if (obj.hasOwnProperty(key)) {
   	    var val = obj[key];
   	    console.log(val);
   	  }
   	}

});

console.log("Program Ended");

/*
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
})
*/

/*
var relayr = new Relayr(app_id);

relayr.connect(token, dev_id);

relayr.on('data', function (topic, msg) {
        console.log(topic + ":" + msg);
});
*/
 
// Relayr.io Stuff
var relayr = new Relayr(app_id);
 
/*relayr.deviceModel(token, dev_id, function (err, description) {
    console.log("-------------- BSH --------------------");
    console.log(description);
    console.log("----------------------------------------------------------");
});*/
 
relayr.connect(token, dev_id);
 
relayr.on("data", function (topic, msg) {
    console.log(topic + ":" + msg);
});
 
relayr.on("connect", function () {
 console.log("connected");
});


