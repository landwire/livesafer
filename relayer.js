var getMedianTemperature = function(data) {
	var tot=data.length;
	var median=0;
	for (var i=0; i < tot; i++) {
	  median = median + data[i];
	}
	median = median/tot;
	return median;
}

var datas = [20,20,20,25,25,20,20,20,20,20,20,23];
console.log(getMedianTemperature(datas));

var alarm = false;
var medianTemp;
while (alarm === false) {
    medianTemp=getMedianTemperature(datas);
    datas.pop();
    datas.unshift(60); // 90 is new temperature reading
    console.log(medianTemp);
    if(medianTemp > 50) {
    	alarm=true;
    }
    // need to onstruct that in another way!!!
    setTimeout(function() {
    	console.log('Waiting 1 second...');
    }, 1000);
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

	var temperature;
	relayr.on("data", function (topic, msg) {
		console.log('TOPIC');
	    console.log(topic);
	    console.log('msg');
	    console.log(msg);
	    // the temperature
	    console.log( msg.readings[0].value);
	    
	});

	relayr.on("connect", function () {
	 console.log("Connected");
	});

	console.log('STUPID TEMPERATURE');
	console.log(temperature);

	

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
