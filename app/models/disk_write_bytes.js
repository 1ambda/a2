var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var DiskWriteBytes = mongoose.model('DiskWriteBytes', MetricSchema);

module.exports = DiskWriteBytes;
