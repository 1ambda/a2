var Instance = require('../models/instance');
var _ = require('underscore');

var CpuUtilization = require('../models/cpu_utilization');
var DiskReadBytes = require('../models/disk_read_bytes');
var DiskWriteBytes = require('../models/disk_write_bytes');
var DiskReadOps = require('../models/disk_read_ops');
var DiskWriteOps = require('../models/disk_write_ops');
var NetworkIn = require('../models/network_in');
var NetworkOut = require('../models/network_out');

// GET '/resources/:metric/:instance/:start/:end'
exports.read = function(req, res) {
	
	var metric = req.params.metric;
	var instance = req.params.instance;
	var time = req.params.start;
	
	res.send();
};

/*
 * TODO : Make getResource Routing
 * TODO : Resource.js(Backbone.Collection) Refactoring
 * TODO : MongoDB Date Compare Query TEST
 * db.sample.find({dt: {$gt : new Date("Wed Jan 15 2014 23:41:00 GMT+0900 (대한민국 표준시)"), $lt : new Date("Wed Jan 15 2014 23:44:00 GMT+0900 (대한민국 표준시)")}})
 */

/* Query
 *
 db.cpuutilizations.find({
 service_name: 'Park Hoon',
 time_stamp: {
 $gt : new Date('Thu Jan 16 2014 09:28:00 GMT+0900'),
 $lt : new Date('Thu Jan 16 2014 09:30:00 GMT+0900')
 }
 })
 *
 */
