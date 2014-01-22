var Instance = require('../models/instance');
var _ = require('underscore');

var CpuUtilization = require('../models/cpu_utilization');
var DiskReadBytes = require('../models/disk_read_bytes');
var DiskWriteBytes = require('../models/disk_write_bytes');
var DiskReadOps = require('../models/disk_read_ops');
var DiskWriteOps = require('../models/disk_write_ops');
var NetworkIn = require('../models/network_in');
var NetworkOut = require('../models/network_out');

var MetricCollection = {
	cpu_utilization : CpuUtilization,
	network_in : NetworkIn,
	network_out : NetworkOut,
	disk_read_bytes : DiskReadBytes,
	disk_write_bytes : DiskWriteBytes,
	disk_read_ops : DiskReadOps,
	disk_write_ops : DiskWriteOps
};

// GET '/resources/:metric/:instance/:time'
// the variable time means 'from'
exports.read = function(req, res) {

	var metric = req.params.metric;
	var instance = req.params.instance;
	var time = req.params.time;

	var start = getStartTime(time);
	var end = new Date();
	
	
	var query = null;
	
	if (metric == "cpu_utilization") {
		query = {average:1, time_stamp:1};
	} else {
		query = {sum:1, time_stamp:1};
	}

	MetricCollection[metric].find({
		instance_id : instance,
		time_stamp : {
			$gt : new Date(start),
			$lt : new Date(end)
		}, 
	}, query, function(err, stat) {
		if (err) {
			console.log(err);
		} else {
			var count = _.size(stat);
			console.log(metric + '[' + instance + '] :' + count);
			res.send(
				stat
			);
		}
	});
};

function getStartTime(text) {

	var time = new Date();

	switch(text) {
		case 'Last1Hour':
			time.setHours(time.getHours() - 1);
			break;
		case 'Last3Hours':
			time.setHours(time.getHours() - 3);
			break;
		case 'Last6Hours':
			time.setHours(time.getHours() - 6);
			break;
		case 'Last12Hours':
			time.setHours(time.getHours() - 12);
			break;
		case 'Last1Day':
			time.setHours(time.getHours() - 24);
			break;
		case 'Last3Days':
			time.setHours(time.getHours() - 72);
			break;
		case 'Last1Week':
			time.setHours(time.getHours() - 168);
			break;
		case 'Last1Month':
			time.setMonth(time.getMonth() - 1);
			break;
	};

	return time;
};

