superagent = require('superagent')

TOKEN = 991ac185
/**
 * Send device reading to zeus
 * @param {object} Example:
 * {
		"name": "Jackson Bonde",
		"device": "9af8642a-65e1-4b9b-b255-515268ae38b5",
		"temperature": "20",
		"coordinates": "52°28'52.9\"N 13°21'25.2\"E",
		"address": "EUREF-Campus, 10829 Berlin",
		"phone": "+4915775983808"
	}
 */
exports.send = function (data) {
	superagent
		.post('http://api.ciscozeus.io:80/logs/+' TOKEN '+/photon/')
		.send('logs=' + JSON.stringify([data]))
		.end(function (err, res) {
			if (err || !res.ok) {
				console.log('Zeus error: ', err);
			} else {
				console.log('Reading sent to zeus. Device ID:', data.device);
			}
		});
	{
		"name": "Jackson Bonde",
		"device": "9af8642a-65e1-4b9b-b255-515268ae38b5",
		"temperature": "20",
		"coordinates": "52°28'52.9\"N 13°21'25.2\"E",
		"address": "EUREF-Campus, 10829 Berlin",
		"phone": "+4915775983808"
	}
 }
