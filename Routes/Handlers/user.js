let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/uploadFile',auth.checkSession, function(req,res) {
	res.render('uploadFile',{data : req.session,title : 'Upload File'});
})

app.get('/sendFileRecords',auth.checkSession, function(req,res) {
    res.render('sendFileRecords',{data : req.session,title : 'Send Files'});
})

app.get('/downloadSendFiles/:pro',auth.checkSession,function(req,res) {
    var filePath = '../../public/uploads/' + req.params.pro.toString();
    res.download(path.join(__dirname, filePath));
})

app.get('/recentFiles',auth.checkSession, function(req,res) {
    res.render('recentFiles',{data : req.session,title : 'Recent Files'});
})

app.get('/receivedFiles',auth.checkSession, function(req,res) {
    res.render('receivedFiles',{data : req.session,title : 'Received Files'});
})

// controllers //

app.use('/uploadmultiple',auth.checkSession,userController.uploadmultiple);

app.use('/Userupload',auth.checkSession,userController.Userupload);

app.use('/uploadmultipleWithoutLogin',auth.checkSession,userController.uploadmultipleWithoutLogin);

app.use('/showSendFiles',auth.checkSession,userController.showSendFiles);

app.use('/deleteSendFiles',auth.checkSession,userController.deleteSendFiles);

app.use('/recentFiles',auth.checkSession,userController.recentFiles);

app.use('/receivedFiles',auth.checkSession,userController.receivedFiles);

module.exports = app;