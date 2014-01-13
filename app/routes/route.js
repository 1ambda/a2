var index = require('./index');
var instance = require('./instance');

var routing = function(app) {
	// index
		// !-- Debug -!
	// app.get('/', routes.index);
	app.get('/', index.debug);
	app.post('/login', index.login);
	app.get('/logout', index.logout);
	
	// instance
	app.get('/instances/:region', instance.read);
};

module.exports = routing; 