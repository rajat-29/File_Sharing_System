var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var ejs = require('ejs');
var mongoose = require('mongoose');	
var port=3000;

app.set('views', path.join(__dirname, 'Views'));  // view engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public'))) /*folder path*/
app.use(express.static(path.join(__dirname,'/public/uploads')))

					/*include mongo*/
var mongoDB = 'mongodb://localhost/fileManagement';

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB,{ useNewUrlParser: true});
var db = mongoose.connection;

app.use(express.urlencoded({extended: true}))
app.use(express.json())   

app.use(express.urlencoded({extended: true}))
app.use(express.json())                 /*include express*/
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: false,
    clear_interval: 900,
    autoRemove: 'native',
    cookie: {maxAge: 3000000}
}))

mongoose.connection.on('error',(err) => {					/*database connect*/
    console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
    console.log('DB connected');
})

app.use('/',require('./Routes/'));

app.get('/', function(req,res) {
    res.render('login');
})

app.listen(port,()=>{console.log("Running on port "+port);});