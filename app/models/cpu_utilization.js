var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var CpuUtilization = mongoose.model('CpuUtilization', MetricSchema);

module.exports = CpuUtilization;
