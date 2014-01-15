var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var NetworkOut = mongoose.model('NetworkOut', MetricSchema);

module.exports = NetworkOut;
