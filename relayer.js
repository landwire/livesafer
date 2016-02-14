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
console.log('Connected');
/*
relayr.on("data", function (topic, msg) {
    console.log(topic + ":" + msg);
});
*/
relayr.on("connect", function () {
 console.log("Connected");
});

setTimeout(function() {
    process.exit();
}, 1000);