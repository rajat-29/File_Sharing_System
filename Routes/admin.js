let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var auth=require('../MiddleWares/auth');
var users = require('../Models/userSchema');

app.get('/addUser',auth, function(req,res) {
	res.render('addUser',{data : req.session});
})

app.post('/addnewuser',auth, function (req, res) {    
    users.create(req.body,function(error,res)
    {
        if(error)
        throw error;
        else{}
     })       
    res.send("data saved");
})

app.get('/userList',auth,function(req,res){  
      res.render('userlist', {data: req.session});
}) 

module.exports = app;