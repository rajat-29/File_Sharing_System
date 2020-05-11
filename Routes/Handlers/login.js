let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let loginController = require('../../Controllers/login');

app.get('/home',auth,function(req,res) {
	res.render('dashboard',{data : req.session});
})

app.get('/changePassword',auth,function(req,res) {
	res.render('changePassword',{data : req.session});
})

app.get('/logout', auth,function(req,res) {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('login');
})

app.get('/index',function(req,res) {
  res.render('index');
})

app.get('/404',function(req,res) {
  res.render('404');
})

app.get('/editProfile',auth,function(req,res) {
  res.render('ProfileDetails',{data : req.session});
})

app.get('/newProfileUpdate',auth,function(req,res) {
  res.render('newProfileUpdate',{data : req.session});
})

// controllers //

app.use('/checkLogin',loginController.checkLogin);
app.use('/changePassword',loginController.changePassword);

module.exports = app;