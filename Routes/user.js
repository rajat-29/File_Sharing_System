let express = require('express');
var app = require('express').Router();
let path = require('path');
var multer=require('multer');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var auth=require('../MiddleWares/auth');
var fileses = require('../Models/fileSchema');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      var photoname =file.originalname + '-' + Date.now()
      cb(null, photoname)
    }
})
var upload = multer({ storage: storage })

app.get('/uploadFile',auth, function(req,res) {
	res.render('uploadFile',{data : req.session});
})

app.post('/uploadmultiple',upload.array('myFiles', 12), function(req, res) {
   const files = req.files
   if(files.length == 0)
   {
   	res.send('false');
   }
   for(var i=0;i<files.length;i++)
   {
   	var obj = new Object();
   	obj.to = req.body.title;
   	obj.from = req.session.email;
   	obj.message = req.body.message;
   	obj.fileName = files[i].filename;
   	obj.originalName = files[i].originalname;
   	obj.type = files[i].mimetype;
   	obj.entryDate = req.body.entryDate;

   	fileses.create(obj,function(error,res)
    {
        if(error)
         throw error;
    })
   }
   res.send('true');
 });

module.exports = app;