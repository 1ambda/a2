
var Alert = require('../models/alert');
var Lock = require('../models/lock');
var _ = require('underscore');

// get
// ('/alerts/:region/:status/:name/:description/:object/:metric/:condition/:threshold/:statistic/:period');
exports.readByAlertQuery = function(req, res) {
	
	var command = makeAlertCommand(req.params);
	
	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

		if (lock.locked) {
			console.log('locked');
		}

		var query = {};
		var documentNumber = lock.alert;

		Alert.find(query).sort({
			updated : -1
		}).limit(documentNumber).exec(function(err, docs) {
			if (err) {
				console.log(err);
				return res.send();
			}

			var result = _.where(docs, command);
			res.send(result);
		});
	});
};

function makeAlertCommand(params) {
	var command = {};

	var region = params.region;
	var status = params.status;
	var name = params.name;
	var description = params.description;
	var object = params.object;
	var metric = params.metric;
	var condition = params.condition;
	var threshold = params.threshold;
	var statistic = params.statistic;
	var period = params.period;

	if (region != 'undefined') {
		command.region = region;
	}

	if (status != 'undefined') {
		command.status = status;
	}

	if (name != 'undefined') {
		command.name = name;
	}

	if (description != 'undefined') {
		command.description = description;
	}

	if (object != 'undefined') {
		command.object = object;
	}

	if (metric != 'undefined') {
		command.metric = metric;
	}

	if (condition != 'undefined') {
		command.condition = condition;
	}

	if (threshold != 'undefined') {
		command.threshold = threshold;
	}

	if (statistic != 'undefined') {
		command.statistic = statistic;
	}

	if (period != 'undefined') {
		command.period = period;
	}

	return command;
};

exports.readAll = function(req, res) {
	getLock(function(lock) {
		if (!lock) {
			res.send();
		}		
		
		if (lock.locked) {
			console.log('locked');
		}
		
		var query = {};
		var documentNumber = lock.alert;
		
		Alert.find(query).sort({
			time_stamp: -1
		}).limit(documentNumber).exec(function(err, docs) {
			if(err) {
				console.log(err);
				return res.send();
			}	
			
			res.send(docs);
		});
	});
};


function getLock(callback) {
	Lock.find(null, function(err, docs) {
		// MongoDB error occurred.
		if (err) {
			return null;
		}

		// There is no lock
		if (!docs.length) {
			return null;
		}

		var lock = docs[0];

		callback(lock);
	});
};