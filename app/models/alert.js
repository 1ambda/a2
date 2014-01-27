var mongoose = require('mongoose');

var AlertSchema = new mongoose.Schema({
	action_ok : String,
	action_alarm : String,
	action_insufficient : String,
	type : String,	// per type, per image
	object : String,	// instance_id, image_id
	name : String,
	description : String,
	status: String,
	condition: String, // Threshold + Ope
	threshold: Number,
	statistic: String,	
	metric: String,
	period: Number,
	region: String,
	time_stamp: Date, 
});

var Alert = mongoose.model('alert', AlertSchema);

module.exports = Alert;
