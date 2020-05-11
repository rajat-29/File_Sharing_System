var express = require('express')
var path = require('path')
var app = express()
var session = require('express-session');
var engine = require("ejs-mate");
var port=3000;

app.engine("ejs", engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname,'/public'))) 
app.use(express.static(path.join(__dirname,'/public/uploads')))

require("./config/db");

app.use(express.urlencoded({extended: true}))
app.use(express.json())               
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: false,
    clear_interval: 900,
    autoRemove: 'native',
    cookie: {maxAge: 3000000}
}))

app.use('/',require('./Routes/'));

app.get('/', function(req,res) {
    res.render('login');
})

app.listen(port,()=>{console.log("Running on port "+port);});