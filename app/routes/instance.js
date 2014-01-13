var Instance = require('../models/instance');
var Lock = require('../models/lock');
var _ = require('underscore');

exports.read = function(req, res) {
	var region = req.params.region;
	var query = makeQuery(req.params.region);

	Lock.find(null, function(err, data) {
		if (err) {
			return console.log(err);
		}

		// There is no lock
		if (!data.length) {
			return send();
		}

		var lock = data[0];

		// Locked
		if (lock.locked) {
			console.log('locked');
			return send();
		}

		var documentNumber = lock[region];

		Instance.find(query).sort({
			updated : -1
		}).limit(documentNumber).exec(function(err, docs) {
			if (err) {
				console.log(err);
				return res.send();
			}

			console.log(docs);
			res.send(docs);
		});

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

