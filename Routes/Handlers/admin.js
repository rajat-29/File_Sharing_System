let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let adminController = require('../../Controllers/admin');

app.get('/addUser',auth, function(req,res) {
	res.render('addUser',{data : req.session});
})

app.get('/userList',auth,function(req,res){  
      res.render('userlist', {data: req.session});
}) 

app.get('/allFiles',auth, function(req,res) {
    res.render('allFiles',{data : req.session});
})

// controllers //

app.use('/addnewuser',adminController.addnewuser);

app.use('/showuser',adminController.showuser);

app.use('/deativateuserdata',adminController.deativateuserdata);

app.use('/reativateuserdata',adminController.reativateuserdata);

app.use('/updateuserdetails',adminController.updateuserdetails);

app.use('/allFiles',adminController.allFiles);

app.use('/switchasuser',adminController.switchasuser);

app.use('/switchasadmin',adminController.switchasadmin);

app.use('/checkemail',adminController.checkemail);

module.exports = app;