let express = require('express');
var app = require('express').Router();
let path = require('path');
const bcrypt = require('bcrypt');
let saltRounds = 10

app.use(express.static(path.join(__dirname,'../../public')));
app.use(express.static(path.join(__dirname,'../../public/uploads')));

var mongoose = require('mongoose')
var auth=require('../../MiddleWares/auth');
var users = require('../../Models/userSchema');
var fileses = require('../../Models/fileSchema');

app.get('/addUser',auth, function(req,res) {
	res.render('addUser',{data : req.session});
})

app.post('/addnewuser',function (req, res) {    
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(!err) {
      req.body.password = hash;
      users.create(req.body,function(error,res)
        {
          if(error)
          throw error;
        })         
    }
    else {}
  }) 
  res.send("data saved");
})

app.post('/checkemail',function (req, res) {
    users.findOne({email: req.body.email}, function(error,result)
      {
        if(error)
        throw error;
      if(!result)
        res.send("false");
      else 
          res.send("true");
      })
})

app.get('/userList',auth,function(req,res){  
      res.render('userlist', {data: req.session});
}) 

app.post('/showuser',auth,function(req, res) {
    let query = {};
    let params = {};
    if(req.body.role === 'All' && req.body.status !== 'All')
        query = {status: req.body.status};
    else if(req.body.role !== 'All' && req.body.status === 'All')
        query = {role: req.body.role};
    else if(req.body.role !== 'All' && req.body.status !== 'All')
        query = {role: req.body.role , status: req.body.status};

    if(req.body.search.value)
    {
        query["$or"]= [{
            "email":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "phone":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "city": { '$regex' : req.body.search.value, '$options' : 'i' }
        }
        ,{
            "status":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }
        ,{
            "role": { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
    }
    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    if(req.body.order[0].column === '0')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {email : sortingType}};
   
    users.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else
            {
                users.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else
                    {
                        users.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
});

app.post('/deativateuserdata',auth,function(req,res) {
    users.updateOne({ "_id" : req.body._id}, {$set: { "flag" : req.body.flag}},
    function(err,result) {
        if(err)
          throw err
        else
            res.send("FLAG UPDATED SUCCESFULLY");
    })
})

app.post('/reativateuserdata',auth,function(req,res) {
    users.updateOne( { "_id" : req.body._id}, {$set: { "flag" : req.body.flag}},
    function(err,result) {
        if(err)
          throw err
        else
            res.send("FLAG UPDATED SUCCESFULLY")
    })
})

app.post('/updateuserdetails',auth,function(req,res) {
    users.updateOne( { "email" : req.body.email}, {$set : req.body } , function(err,result) {
          if(err)
          throw err
          else
            res.send("DATA UPDATED SUCCESFULLY")
    })
})

app.get('/allFiles',auth, function(req,res) {
    res.render('allFiles',{data : req.session});
})

app.post('/allFiles',auth,function(req, res) {
    let query = {};
    let params = {};

    if(req.body.search.value)
    {
        query["$or"]= [{
            "originalName":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "to":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "from":{ '$regex' : req.body.search.value, '$options' : 'i' }
        },{
            "message": { '$regex' : req.body.search.value, '$options' : 'i' }
        }
        ,{
            "type":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }
        ,{
            "entryDate": { '$regex' : req.body.search.value, '$options' : 'i' }
        }]
    }
    let sortingType;
    if(req.body.order[0].dir === 'asc')
        sortingType = 1;
    else
        sortingType = -1;

    fileses.find(query , {} , params , function (err , data)
        {
            if(err)
                console.log(err);
            else
            {
                fileses.countDocuments(query, function(err , filteredCount)
                {
                    if(err)
                        console.log(err);
                    else
                    {
                        fileses.countDocuments(function (err, totalCount)
                        {
                            if(err)
                                console.log(err);
                            else
                                res.send({"recordsTotal": totalCount,
                                    "recordsFiltered": filteredCount, data});
                        })
                    }
                });
            }
        })
});

app.get('/switchasuser',auth,function(req,res) {
  users.updateOne( { "email" : req.session.email}, {$set: { "role" : "superAdmin"}} ,
    function(err,result){
          if(err)
          throw err
          else {
           req.session.role = "superAdmin"
            res.render('switchasUser', {data: req.session.data});
          }
    })
})

app.get('/switchasadmin',auth,function(req,res) {
  users.updateOne( { "email" : req.session.email}, {$set: { "role" : "Admin"}} ,
    function(err,result){
          if(err)
          throw err
          else {
           req.session.role = "Admin"
            res.render('switchasAdmin', {data: req.session.data});
          }
    })
})

module.exports = app;