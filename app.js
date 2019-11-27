var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var mongodb = require('mongodb');
var port=8000;

app.set('views', path.join(__dirname, 'views'));  // view engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public'))) /*folder path*/

var mongoose = require('mongoose');						/*include mongo*/
var mongoDB = 'mongodb://localhost/fileManagement';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB,{ useNewUrlParser: true});

var db = mongoose.connection;

app.use(express.urlencoded({extended: true}))
app.use(express.json())   

mongoose.connection.on('error',(err) => {					/*database connect*/
    console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    console.log('DB connected');
})

app.listen(port,()=>{console.log("Running on port "+port);});