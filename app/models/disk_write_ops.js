var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var DiskWriteOps = mongoose.model('DiskWriteOps', MetricSchema);

module.exports = DiskWriteOps;
