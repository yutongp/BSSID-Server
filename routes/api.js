var https = require('https')
, path = require('path')
, async = require('async')
, mongoose = require('mongoose');

exports.locationVarWifi = function(req, res) {
	console.log(req.query.bss);
	var Wifi = mongoose.model('Wifi');
	Wifi
		.findOne({bss: req.query.bss})
		.exec(function(err, wifi){
			if (wifi) {
			console.log("lat", wifi.lat, " lng", wifi.lng);
			res.send("you around: lat "+ wifi.lat + " lng " + wifi.lng);
			} else {
				console.log('not found');
				res.send("Sorry we don't have location info for you");
			}
		});

}

exports.setWifiLocation = function(req, res) {
	var Wifi = mongoose.model('Wifi');
	var id = req.body['id'];
	var lat = req.body['lat'];
	var lng = req.body['lng'];
	var checkAndAddWifi = function(bss, lat, lng) {
		Wifi.findOne({bss: bss}, function(err, wifi){
			if (wifi) {
				console.log("wifi exist:", wifi);
			} else {
				var wifi = new Wifi ({
					bss: bss
					, lat: lat
					, lng: lng
				});
				wifi.save(function(err){
					console.log("add new wifi", bss);
				});
			}
		});
	}
	for (var i = 0; i < req.body['wifi'].length; i++) {
		console.log(req.body['wifi'][i]['name'], req.body['wifi'][i]['bss']);
		checkAndAddWifi(req.body['wifi'][i]['bss'], lat, lng);
	}
	res.send("YYYYYYYYY");
}
