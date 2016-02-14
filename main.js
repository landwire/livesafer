var fs = require("fs");
var obj;

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



var request = require('request');
request('http://localhost:33000/test', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
});

