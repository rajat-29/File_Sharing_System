let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.post('/checkLogin',function(req,res) {
	req.session.isLogin = 0;
	console.log(req.body)
	users.findOne({email : req.body.email,password : req.body.password}, function(error,result)
	{
		if(error)
			throw error;
		else
		{
			req.session.isLogin = 1;
			req.session.email = req.body.email;
			req.session.name = result.name;       
            req.session.password = result.password;
            res.send(req.session); 
		}
	})
})

module.exports = app;