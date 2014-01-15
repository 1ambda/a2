var Instance = require('../models/instance');
var Lock = require('../models/lock');
var _ = require('underscore');

var CpuUtilization = require('../models/cpu_utilization');
var DiskReadBytes = require('../models/disk_read_bytes');
var DiskWriteBytes = require('../models/disk_write_bytes');
var DiskReadOps = require('../models/disk_read_ops');
var DiskWriteOps = require('../models/disk_write_ops');
var NetworkIn = require('../models/network_in');
var NetworkOut = require('../models/network_out');

/*
 * TODO : Make getResource Routing
 * TODO : Resource.js(Backbone.Collection) Refactoring
 * TODO : MongoDB Date Compare Query TEST 
 * db.sample.find({dt: {$gt : new Date("Wed Jan 15 2014 23:41:00 GMT+0900 (대한민국 표준시)"), $lt : new Date("Wed Jan 15 2014 23:44:00 GMT+0900 (대한민국 표준시)")}})
 */

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

	if (service == 'null') {
		service = null;
	}

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

		var documentNumber = lock.global;

		Instance.find().sort({
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

