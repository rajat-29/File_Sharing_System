var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new mongoose.Schema({
	from: String,
    to: String,
    message: String,
    fileName: String,
    originalName: String,
    type: String,
    entryDate: String,
})

module.exports = mongoose.model('userfiles', fileSchema);