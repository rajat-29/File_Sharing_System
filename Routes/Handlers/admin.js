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

app.get('/manage_users',auth,function(req,res){  
      res.render('manage_users', {data: req.session});
}) 

app.get('/manage_files',auth, function(req,res) {
    res.render('manage_files',{data : req.session});
})

// controllers //

app.use('/addnewuser',auth,adminController.addnewuser);

app.use('/showuser',auth,adminController.showuser);

app.use('/deativateuserdata',auth,adminController.deativateuserdata);

app.use('/reativateuserdata',auth,adminController.reativateuserdata);

app.use('/updateuserdetails',auth,adminController.updateuserdetails);

app.use('/allFiles',auth,adminController.allFiles);

app.use('/switchasuser',auth,adminController.switchasuser);

app.use('/switchasadmin',auth,adminController.switchasadmin);

app.use('/checkemail',auth,adminController.checkemail);

module.exports = app;