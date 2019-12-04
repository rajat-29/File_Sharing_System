let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.get('/addUser', function(req,res) {
	res.render('addUser',{data : req.session});
})

module.exports = app;