zeus = require('./zeus.js');

var getMedianTemperature = function(data) {
	var tot=data.length;
	var median=0;
	for (var i=0; i < tot; i++) {
	  median = median + data[i];
	}
	median = median/tot;
	return median;
}

// RELAYR.IO STUFF
	var Relayr = require('relayr');
	var app_id = "{ebe9f40a-f6df-4760-8c43-1c8a35fd50f8}";
	var dev_id = "9af8642a-65e1-4b9b-b255-515268ae38b5";
	var token  = "VFxQi3GrH1R-FxXf8jcRJ-lQlN1N3xuA";

	


	

	var relayr = new Relayr(app_id);
	console.log('START');
	/*
	relayr.deviceModel(token, dev_id, function (err, description) {
	    console.log("-------------- BSH --------------------");
	    console.log(description);
	    console.log("----------------------------------------------------------");
	});
	*/

	relayr.connect(token, dev_id);
	//console.log('Connected');

	var last_temperatures=[20,20,20,25,25,20,20,20,20,20];
	var averageTemperature = 20;
	relayr.on("data", function (topic, msg) {
		console.log('TOPIC');
	    console.log(topic);
	    console.log('msg');
	    console.log(msg);
	    // the temperature
	    console.log( msg.readings[0].value);
	    console.log( msg.deviceId);

	    // check for freak readings
	    // get the average temperature
    	averageTemperature = getMedianTemperature(last_temperatures);
    	if(msg.readings[0].value > (averageTemperature + 50) ) {
    		// it's a freak reading, do nothing!!!
    	} else {
    		// track last 10 readings = 30 minute;
 	    	last_temperatures.pop();
    		last_temperatures.unshift(msg.readings[0].value); // 90 is new temperature reading
    	}

    	console.log(last_temperatures);

    	// get the average temperature
    	averageTemperature = getMedianTemperature(last_temperatures);

    	// check for heat
    	if(averageTemperature > 50) {
    		console.log('HOT HOT HOT');
    	} else {
    		console.log('All COOL');
    	}
    	var test3 = {
    	"name": "Jackson Bonde",
		"device": "9af8642a-65e1-4b9b-b255-515268ae38b5",
		"temperature": msg.readings[0].value,
		"coordinates": "52°28'52.9\"N 13°21'25.2\"E",
		"address": "EUREF-Campus, 10829 Berlin",
		"phone": "+4915775983808"
		}
	    //sendDataToZeus();
	    zeus.send(test3)
	});

	relayr.on("connect", function () {
	 console.log("Connected");
	});

	//console.log('STUPID TEMPERATURE');
	//console.log(temperature);

	

var getDeviceTemperature = function(msg) {
	console.log('MSG');
	console.log(msg);
	if (typeof(msg.readings) != "undefined") {
		return msg.readings[0].value
	} else {
		// error handling
		return 'ERROR';
	}
}

//var test = getDeviceTemperature();
console.log('TEST');
