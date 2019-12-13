let express = require('express');
var app = require('express').Router();
let path = require('path');
const bcrypt = require('bcrypt');
let saltRounds = 10

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var users = require('../Models/userSchema');

app.post('/checkLogin',function (req, res)   
  {
      req.session.isLogin = 0;
      var username = req.body.email;
      var pasword = req.body.password;
      users.findOne({email: username}, function(error,result)
      {
        if(error)
        throw error;

        if(!result) {
          res.send("not exits");
        }
        else {
         
          
           bcrypt.compare(req.body.password,result.password,function(err,resi) {
            if(resi == true) {
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
              res.send("false")
          }) 
        }
      })     
})

app.get('/home',function(req,res) {
	res.render('dashboard',{data : req.session});
})

app.get('/changePassword',function(req,res) {
	res.render('changePassword',{data : req.session});
})

app.post('/changePassword',function(req,res){
    bcrypt.hash(req.body.newpass, saltRounds, (err, hash) => {
              if(!err) {
                users.updateOne({"email" : req.session.email},{$set: { "password" : hash}} ,
                  function(error,result)
                  {
                    if(error)
                      throw error;
                    else
                      req.session.password = req.body.newpass;
                  })   
              }
              else {}
    }) 
    res.send("Password Changed Successfully")
})

app.get('/logout', function(req,res) {
    req.session.isLogin = 0;
    req.session.destroy();
    res.render('index');
})

app.get('/signUp',function(req,res) {
  res.render('signUp');
})

app.get('/index',function(req,res) {
  res.render('index');
})

module.exports = app;