let express = require('express');
var app = require('express').Router();
let path = require('path');

app.use(express.static(path.join(__dirname,'../public')));

var mongoose = require('mongoose')
var auth=require('../MiddleWares/auth');
var users = require('../Models/userSchema');

app.get('/addUser',auth, function(req,res) {
	res.render('addUser',{data : req.session});
})

app.post('/addnewuser',auth, function (req, res) {    
    users.create(req.body,function(error,res)
    {
        if(error)
        throw error;
        else{}
     })       
    res.send("data saved");
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
    else if(req.body.order[0].column === '2')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {city : sortingType}};
    else if(req.body.order[0].column === '3')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {status : sortingType}};
    else if(req.body.order[0].column === '4')
        params = {skip : parseInt(req.body.start) , limit : parseInt(req.body.length), sort : {role : sortingType}};
 
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

module.exports = app;