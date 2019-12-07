var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    gender: String,
    dob : String,
    role: String,   
    status: String,
    photoname: String,
    flag: String,
})

module.exports = mongoose.model('users', userSchema);