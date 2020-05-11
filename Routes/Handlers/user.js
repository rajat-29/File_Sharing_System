let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/uploadFile',auth.checkUser, function(req,res) {
	res.render('uploadFile',{data : req.session});
})

app.get('/sendFileRecords',auth.checkUser, function(req,res) {
    res.render('sendFileRecords',{data : req.session});
})

app.get('/downloadSendFiles/:pro',auth.checkUser,function(req,res) {
    var filePath = '../../public/uploads/' + req.params.pro.toString();
    res.download(path.join(__dirname, filePath));
})

app.get('/recentFiles',auth.checkUser, function(req,res) {
    res.render('recentFiles',{data : req.session});
})

app.get('/receivedFiles',auth.checkUser, function(req,res) {
    res.render('receivedFiles',{data : req.session});
})

// controllers //

app.use('/uploadmultiple',auth.checkUser,userController.uploadmultiple);

app.use('/Userupload',auth.checkUser,userController.Userupload);

app.use('/uploadmultipleWithoutLogin',auth.checkUser,userController.uploadmultipleWithoutLogin);

app.use('/showSendFiles',auth.checkUser,userController.showSendFiles);

app.use('/deleteSendFiles',auth.checkUser,userController.deleteSendFiles);

app.use('/recentFiles',auth.checkUser,userController.recentFiles);

app.use('/receivedFiles',auth.checkUser,userController.receivedFiles);

module.exports = app;