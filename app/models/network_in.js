var mongoose = require('mongoose');

var MetricSchema = require('./metric');

var NetworkIn = mongoose.model('NetworkIn', MetricSchema);

module.exports = NetworkIn;
