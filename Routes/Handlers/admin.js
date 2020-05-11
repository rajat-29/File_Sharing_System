let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var auth=require('../../MiddleWares/auth');

let adminController = require('../../Controllers/admin');

app.get('/addUser',auth.checkAdmin, function(req,res) {
	res.render('addUser',{data : req.session});
})

app.get('/manage_users',auth.checkAdmin,function(req,res){  
      res.render('manage_users', {data: req.session});
}) 

app.get('/manage_files',auth.checkAdmin, function(req,res) {
    res.render('manage_files',{data : req.session});
})

// controllers //

app.use('/addnewuser',auth.checkAdmin,adminController.addnewuser);

app.use('/showuser',auth.checkAdmin,adminController.showuser);

app.use('/deativateuserdata',auth.checkAdmin,adminController.deativateuserdata);

app.use('/reativateuserdata',auth.checkAdmin,adminController.reativateuserdata);

app.use('/updateuserdetails',auth.checkAdmin,adminController.updateuserdetails);

app.use('/allFiles',auth.checkAdmin,adminController.allFiles);

app.use('/switchasuser',auth.checkSession,adminController.switchasuser);

app.use('/switchasadmin',auth.checkSession,adminController.switchasadmin);

app.use('/checkemail',auth.checkAdmin,adminController.checkemail);

module.exports = app;