var index = require('./index');
var instance = require('./instance');
var resource = require('./resource');
var alert = require('./alert');

var routing = function(app) {
	// index
		// !-- Debug -!
	// app.get('/', index.home);
	app.get('/', index.debug);
	app.post('/login', index.login);
	app.get('/logout', index.logout);
	
	// instance
	app.get('/instances/region/:region', instance.readByRegion);
	app.get('/instances/service/:service', instance.readByService);
	app.get('/instances/:service/:id/:type/:state/:region/:public/:private/:security', instance.readByInstanceQuery);
	app.get('/instance/:id/max_resources', instance.readMaxResources);
	app.get('/instances/cpu/:time', instance.readAvgCpuUtilization);
	app.get('/resources/:metric/:instance/:time', resource.read);
	app.get('/alerts/', alert.readAll);
	app.get('/alerts/:region/:status/:name/:description/:object/:metric/:condition/:threshold/:statistic/:period', alert.readByAlertQuery);
};

module.exports = routing;  