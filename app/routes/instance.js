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
var async = require('async');

exports.readMaxResources = function(req, res) {
	
	var lastFrom = 24;

	var today = new Date();;
	var yesterday = new Date(today);
	yesterday.setHours(yesterday.getHours() - lastFrom);

	today = today.toISOString();
	yesterday = yesterday.toISOString();

	console.log(req.params.id);

	async.parallel({
		cpu : function(callback) {
			CpuUtilization.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					return res.send();
				}
				
				callback(null, docs[0]);
			});
		},

		network_in : function(callback) {
			NetworkIn.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		},

		network_out : function(callback) {
			NetworkOut.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		},

		disk_read_bytes : function(callback) {
			DiskReadBytes.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		},

		disk_write_bytes : function(callback) {
			DiskWriteBytes.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		},

		disk_read_ops : function(callback) {
			DiskReadOps.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		},

		disk_write_ops : function(callback) {
			DiskWriteOps.find({
				time_stamp: {$gt: yesterday, $lt: today }
			}).sort({maximum: -1}).limit(1).exec(function(err, docs) {
				if(err) {
					console.log(err);
					callback(err, null);
				}
				
				callback(null, docs[0]);
			});
		}
	}, function(err, results) {
		if (err) {
			return res.send(err);
		}
		
		res.send(results);
	});
};

exports.readByInstanceQuery = function(req, res) {

	var region = 'global';
	var command = makeInstanceCommand(req.params);

	getLock(function(lock) {
		if (!lock) {
			res.send();
		}

		if (lock.locked) {
			console.log('locked');
		}

		var query = makeQuery(region, lock.updated);
		var documentNumber = lock[region];

		Instance.find(query).sort({
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

	console.log(command);
};

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

function makeInstanceCommand(params) {
	var command = {};

	var service = params.service;
	var id = params.id;
	var type = params.type;
	var state = params.state;
	var region = params.region;
	var public = params.public;
	var private = params.private;
	var security = params.security;

	if (service != 'undefined') {
		command.service_name = service;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (type != 'undefined') {
		command.instance_type = type;
	}
	if (state != 'undefined') {
		command.instance_state = state;
	}
	if (region != 'undefined') {
		command.region = region;
	}
	if (public != 'undefined') {
		command.public_ip = public;
	}
	if (private != 'undefined') {
		command.private_ip = private;
	}
	if (security != 'undefined') {
		command.service_name = security;
	}

	return command;
};

function makeServiceCommand(params) {
	var command = {};

	var service = params.service;
	var instance = params.instance;
	var alert = params.alert;
	var running = params.running;
	var pending = params.pending;
	var stopped = params.stopped;
	var terminated = params.terminated;

	if (service != 'undefined') {
		command.service_name = service;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}
	if (id != 'undefined') {
		command.instance_id = id;
	}

	return command;
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

