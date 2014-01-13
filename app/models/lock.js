var mongoose = require('mongoose');

var LockSchema = new mongoose.Schema({
	global: { type: Number, default :0 }, 
	tokyo: { type: Number, default :0 }, 
	singapore: { type: Number, default :0 }, 
	sydney: { type: Number, default :0 }, 
	ireland: { type: Number, default :0 }, 
	saopaulo: { type: Number, default :0 }, 
	virginia: { type: Number, default :0 }, 
	california: { type: Number, default :0 }, 
	oregon: { type: Number, default :0 }, 
	locked: Boolean,
	updated: { type: Date, default: Date.now }
});

var Lock = mongoose.model('Lock', LockSchema);

module.exports = Lock;