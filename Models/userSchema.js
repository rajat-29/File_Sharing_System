var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    gender: String,
    role: String,   
    status: String,
})

module.exports = mongoose.model('users', userSchema);