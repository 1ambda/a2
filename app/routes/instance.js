var Instance = require('../models/instance');
var Lock = require('../models/lock');
var _ = require('underscore');

exports.readByRegion = function(req, res) {
	var region = req.params.region;
	var query = makeQuery(req.params.region);

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

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
	
	if ( service == 'null') {
		service = null;
	}

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}
		
		var documentNumber = lock.global;
		
		Instance.find().sort({
			updated: -1
		})	.limit(documentNumber).exec(function(err, docs) {
			if (err) {
				console.log(err);
				return res.send();	
			}	
			
			var services = _.where(docs, { service_name : service} );
			res.send(services);
		});
	});
};

exports.readById = function(req, res) {
	console.log('readById : ' + req.params.id);

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

		res.send();
	});

};

function makeQuery(region) {

	var query = {
		region : region
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

		if (lock.locked) {
			console.log('locked');
			return null;
		}

		callback(lock);
	});
};

