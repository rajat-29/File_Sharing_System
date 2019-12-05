let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.post('/checkLogin',function(req,res) {
	req.session.isLogin = 0;
	users.findOne({email : req.body.email,password : req.body.password}, function(error,result)
	{
		if(error)
			throw error;
		if(result)
		{
			req.session.isLogin = 1;
			req.session.email = req.body.email;
			req.session.name = result.name;       
            req.session.password = result.password;
            req.session.phone = result.phone;       
            req.session.city = result.city;       
            req.session.gender = result.gender;       
            req.session.role = result.role;       
            req.session.status = result.status;       
            req.session.photoname = result.photoname;     
            var re = req.session.redirectUrl || '/login/home';
            res.send(re);
		}
		else
		{
			res.send('false');
		}
	})
})

app.get('/home',function(req,res) {
	res.render('dashboard',{data : req.session});
})

app.get('/changePassword',function(req,res) {
	res.render('changePassword',{data : req.session});
})

app.get('/logout', function(req,res) {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('index');
})

module.exports = app;