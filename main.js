var fs = require("fs");
var obj;
var station = 'data/firestation1.json';

// must do it synchronous!!!!

// Asynchronous read
fs.readFile(station, function (err, data) {
   	if (err) {
       return console.error(err);
   	}
   	//make data JSON
   	stationdata = JSON.parse(data);

   	console.log("Asynchronous read: " + data);
   	console.log('JSON OBJECT: ');
   	// must be console.logges alone!!!
   	console.log(obj);


   	for (var key in stationdata) {
   	  if (stationdata.hasOwnProperty(key)) {
   	  	console.log(key);
   	  	if(key === "fyresafer1") {
	   	    var val = stationdata[key];
	   	    console.log('before val');
	   	    console.log(val);
	   	    console.log('after val');
	   	}
   	  }
   	}

   	var test1 = getField(stationdata, 'fyresafer2', 'name');
   	var test2 = getField(stationdata, 'fyresafer1', 'deviceid');
   	console.log(test1);
   	console.log(test2);


});

// get a field out of any firestation for any fyresafer
function getField(station, fyresafer, fieldname) {
	for (var key in station) {
   	  if (station.hasOwnProperty(key)) {
   	  	console.log(key);
   	  	if(key === fyresafer) {
	   	    var fyresafers = station[key];
	   	    	console.log(fyresafers);
	   	    for (var key in fyresafers) {
	   	      	if (fyresafers.hasOwnProperty(key)) {
	   	      		if(key === fieldname) {
		   	      		var fieldValue = fyresafers[key];
		   	    		console.log(fieldValue);
	   	      		}
	   	      	}

	   	    }
	   	}
   	  }
   	}
   	return fieldValue;
}

console.log("Program Ended");



var request = require('request');
request('http://localhost:33000/test', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
});



