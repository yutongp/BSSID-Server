/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var WifiSchema = new Schema({
	bss: { type: String, default: '', trim: true }
	,lat: { type: Number, min: -90, max: 90 }
	,lng: { type: Number, min: -180, max: 180 }
});

mongoose.model('Wifi', WifiSchema);
