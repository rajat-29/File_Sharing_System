let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let loginController = require('../../Controllers/login');

app.get('/home',auth.checkSession,function(req,res) {
	res.render('dashboard',{data : req.session});
})

app.get('/changePassword',auth.checkSession,function(req,res) {
	res.render('changePassword',{data : req.session});
})

app.get('/logout', auth.checkSession,function(req,res) {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('login');
})

app.get('/editProfile',auth.checkSession,function(req,res) {
  res.render('ProfileDetails',{data : req.session});
})

app.get('/newProfileUpdate',auth.checkSession,function(req,res) {
  res.render('newProfileUpdate',{data : req.session});
})

// controllers //

app.use('/checkLogin',loginController.checkLogin);
app.use('/changePassword',auth.checkSession,loginController.changePassword);

module.exports = app;