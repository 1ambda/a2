var Instance = require('../models/instance');
var Lock = require('../models/lock');
var _ = require('underscore');

exports.readByRegion = function(req, res) {
	var region = req.params.region;

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}
		
		if (lock.locked) {
			console.log('locked');
		}

		var query = makeQuery(req.params.region, lock.updated);
		var documentNumber = lock[region];

		Instance.find(query).sort({
			updated : -1
		}).limit(documentNumber).exec(function(err, docs) {
			if (err) {
				console.log(err);
				return res.send();
			}
			res.send(docs);
		});
	});
};

exports.readByService = function(req, res) {

	var service = req.params.service;

	if (service == 'null') {
		service = null;
	}

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

		if (lock.locked) {
			console.log('locked');
		}

		var documentNumber = lock.global;
		console.log(lock.updated);

		Instance.find({
			updated : {
				$lt : lock.updated
			}
		}).sort({
			updated : -1
		}).limit(documentNumber).exec(function(err, docs) {
			if (err) {
				console.log(err);
				return res.send();
			}

			var services = _.where(docs, {
				service_name : service
			});
			res.send(services);
		});
	});
};

function makeQuery(region, updated) {

	console.log(updated);

	var query = {
		region : region,
		updated : {
			$lt : updated
		}
	};

	if (region == 'global') {
		query = {};
	}

	return query;
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

