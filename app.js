
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://archer:rampart@ds027829.mongolab.com:27829/test');
mongoose.connect('mongodb://archer:rampart@localhost/test');

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({secret: 'aws-archer'}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// route

var routing = require('./app/routes/route');
routing(app);


