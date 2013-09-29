
/**
 * Module dependencies.
 */

var express = require('express')
  , api = require('./routes/api')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , async = require('async')
  , mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost/wifilocation");
require('./models.js');

var Wifi = mongoose.model('Wifi');

app.set('port', process.env.PORT || 8999);
app.set('env', 'development');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('secert1qaz2wsx'));
app.use(express.session());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/loc.via.wifi', api.locationVarWifi);
app.post('/wifi.loc.info', api.setWifiLocation);

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
