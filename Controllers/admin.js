const bcrypt = require('bcrypt');
let saltRounds = 10

var auth=require('../MiddleWares/auth');
var users = require('../Models/userSchema');
var fileses = require('../Models/fileSchema');

exports.addnewuser = (req, res) => {    
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(!err) {
      req.body.password = hash;
        users.create(req.body,function(error,res) {
          if(error)
            throw error;
        })         
    }
    else {}
  }) 
  res.send("data saved");
}

exports.showuser = (req, res) => {
    let query = {};
    let params = {};

    if(req.body.role === 'All' && req.body.status !== 'All')
        query = {status: req.body.status};
    else if(req.body.role !== 'All' && req.body.status === 'All')
        query = {role: req.body.role};
    else if(req.body.role !== 'All' && req.body.status !== 'All')
        query = {role: req.body.role , status: req.body.status};

    if(req.body.search.value)  {
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
   
    users.find(query , {} , params , function (err , data) {
        if(err)
            console.log(err);
        else {
            users.countDocuments(query, function(err , filteredCount) {
                if(err)
                    console.log(err);
                else {
                    users.countDocuments(function (err, totalCount) {
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
}

exports.deativateuserdata = (req,res) => {
    users.updateOne({ "_id" : req.body._id}, {$set: { "flag" : req.body.flag}},
    function(err,result) {
        if(err)
          throw err
        else
            res.send("FLAG UPDATED SUCCESFULLY");
    })
}

exports.reativateuserdata = (req,res) => {
    users.updateOne( { "_id" : req.body._id}, {$set: { "flag" : req.body.flag}},
    function(err,result) {
        if(err)
          throw err
        else
            res.send("FLAG UPDATED SUCCESFULLY")
    })
}

exports.updateuserdetails = (req,res) => {
    users.updateOne( { "email" : req.body.email}, {$set : req.body } , function(err,result) {
          if(err)
          throw err
          else
            res.send("DATA UPDATED SUCCESFULLY")
    })
}

exports.allFiles = (req, res) => {
    let query = {};
    let params = {};

    if(req.body.search.value) {

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

    fileses.find(query , {} , params , function (err , data) {
        if(err)
            console.log(err);
        else {
            fileses.countDocuments(query, function(err , filteredCount) {
                if(err)
                    console.log(err);
                else {
                    fileses.countDocuments(function (err, totalCount) {
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
}

exports.switchasuser = (req,res) => {
  users.updateOne( { "email" : req.session.email}, {$set: { "role" : "superAdmin"}} ,
    function(err,result){
        if(err)
          throw err
        else {
           req.session.role = "superAdmin"
            res.render('switchAsUserAdmin', {data: req.session});
        }
    })
}

exports.switchasadmin = (req,res) => {
  users.updateOne( { "email" : req.session.email}, {$set: { "role" : "Admin"}} ,
    function(err,result){
        if(err)
          throw err
        else {
           req.session.role = "Admin"
            res.render('switchAsUserAdmin', {data: req.session});
        }
    })
}

exports.checkemail = (req, res) => {
    users.findOne({email: req.body.email}, function(error,result) {
        if(error)
            throw error;
        if(!result)
            res.send("false");
        else 
            res.send("true");
    })
}