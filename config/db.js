const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/fileManagement';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB, {useNewUrlParser : true,useUnifiedTopology: true});

mongoose.connection.on('error', (err) => {
	console.log('DB connection error');
})

mongoose.connection.on('connected', (err) => {
	console.log('DB connected');
})