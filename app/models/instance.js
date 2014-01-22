var mongoose = require('mongoose');

var InstanceSchema = new mongoose.Schema({
	service_name : String,
	instance_id : String,
	instance_type : String,
	instance_state : String,
	region : String,
	public_ip : String,
	private_ip : String,
	security_group : String,
	launch_time: Date,
	updated: { type: Date, default: Date.now }
});

var Instance = mongoose.model('Instance', InstanceSchema);

module.exports = Instance;
