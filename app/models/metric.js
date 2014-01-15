var mongoose = require('mongoose');

var MetricSchema = new mongoose.Schema({
	instance_id: String,
	time_stamp: String,

	instance_type: String,
	service_name: String,	
	region: String,
	
	unit: String,
	minimum: Number,
	maximum: Number,
	sum: Number,
	average: Number
});

MetricSchema.index({instance_id : 1, time_stamp: 1}, {unique: true});

module.exports = MetricSchema;