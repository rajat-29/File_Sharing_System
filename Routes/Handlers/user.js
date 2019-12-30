let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let userController = require('../../Controllers/user');

app.get('/uploadFile',auth, function(req,res) {
	res.render('uploadFile',{data : req.session});
})

app.get('/sendFileRecords',auth, function(req,res) {
    res.render('sendFileRecords',{data : req.session});
})

app.get('/downloadSendFiles/:pro',auth,function(req,res) {
    var filePath = '../../public/uploads/' + req.params.pro.toString();
    res.download(path.join(__dirname, filePath));
})

app.get('/recentFiles',auth, function(req,res) {
    res.render('recentFiles',{data : req.session});
})

app.get('/receivedFiles',auth, function(req,res) {
    res.render('receivedFiles',{data : req.session});
})

// controllers //

app.use('/uploadmultiple',auth,userController.uploadmultiple);

app.use('/Userupload',auth,userController.Userupload);

app.use('/uploadmultipleWithoutLogin',auth,userController.uploadmultipleWithoutLogin);

app.use('/showSendFiles',auth,userController.showSendFiles);

app.use('/deleteSendFiles',auth,userController.deleteSendFiles);

app.use('/recentFiles',auth,userController.recentFiles);

app.use('/receivedFiles',auth,userController.receivedFiles);

module.exports = app;