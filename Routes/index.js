let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.static(path.join(__dirname,'../public/uploads')));

app.use('/login',require('./Handlers/login.js'));
app.use('/admin',require('./Handlers/admin.js'));
app.use('/user',require('./Handlers/user.js'));

module.exports = app;