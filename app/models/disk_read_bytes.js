var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var DiskReadBytes = mongoose.model('DiskReadBytes', MetricSchema);

module.exports = DiskReadBytes;
