zeus = require('./zeus.js');
request = require('superagent');

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

	var last_temperatures=[20,20,20,20,20,20];
	var averageTemperature = 20;
	var called = false;
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
    	if( (msg.readings[0].value > (averageTemperature + 40)) || (msg.readings[0].value < (averageTemperature - 40)) ) {
    		// it's a freak reading, do nothing!!!
    	} else {
    		// track last 10 readings = 30 minute;
 	    	last_temperatures.pop();
    		last_temperatures.unshift(msg.readings[0].value); // 90 is new temperature reading
    	}

    	console.log(last_temperatures);

    	// get the average temperature
    	averageTemperature = getMedianTemperature(last_temperatures);

    	//averageTemperature = 45;
    	// check for heat
    	if(averageTemperature > 40) {
    		console.log('HOT HOT HOT');
    		if (called === false) {
    			called = true;
	    		request
	    		    .post('https://api.tropo.com/1.0/sessions')
	    		    .send({
	    		  "customerTelephone": "Marfeder@cisco.com",
	    		  "customerName": "John Dyer",
	    		  "neighbourTelephone": "Marfeder@cisco.com",
	    		  "neighbourName": "Patrick Yellow",
	    		  "token": "5a4168777877505150566d51764652554f6f6161494950624d72635a4456534159496d69454d4d487649534c",
	    		  "action": "create"
	    		})
	    		    .end(function(err, res) {
	    		    	if (err || !res.ok) {
	    		    		console.log('TROPo error: ', err);
	    		    	} else {
	    		    		console.log('Call initiated:');
	    		    		called = true;
	    		   		}
	    		   	});
	    	}
    	} else {
    		console.log('All COOL');
    		// make sure to reset the called variable to false for the next incident!!!
    		called = false;
    	}
    	console.log(parseInt(averageTemperature));
    	var test3 = {
    	"name": "Jackson Bonde",
		"device": "9af8642a-65e1-4b9b-b255-515268ae38b5",
		"temp2": parseInt(averageTemperature),
		"geoip.location": "52.4805299,13.3543244",
		"address": "EUREF-Campus, 10829 Berlin",
		"phone": "+4915775983808"
		}
		var test4 = {
    	"name": "Jackson Bonde",
		"device": "4449af8642a-65e1-4b9b-b255-515268ae38b5",
		"temp2": 100,
		"geoip.location": "-180, -180",
		"address": "EUREF-Campus, 10829 Berlin",
		"phone": "+4915775983808"
		}
	    //sendDataToZeus();
	    zeus.send(test3);
	    zeus.send(test4);
	    //zeus.send(30);
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
		return msg.readings[0].value;
	} else {
		// error handling
		return 'ERROR';
	}
}

//var test = getDeviceTemperature();
console.log('TEST');