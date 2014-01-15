var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var DiskReadOps = mongoose.model('DiskReadOps', MetricSchema);

module.exports = DiskReadOps;
