let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.get('/addUser', function(req,res) {
	res.render('addUser',{data : req.session});
})

app.post('/addnewuser',function (req, res) {    
    users.create(req.body,function(error,res)
    {
        if(error)
        throw error;
        else{}
     })       
    res.send("data saved");
  }) 

module.exports = app;