var fs = require('fs');
let path = require('path');
var multer=require('../MiddleWares/multer');

var fileses = require('../Models/fileSchema');

exports.uploadmultiple = (req, res) => {
    multer.upload(req,res, (err) => {
        if (err)
            res.send("format")
        else{
           const files = req.files
              if(files.length == 0) 
                res.send('false');
               else {
                    for(var i=0;i<files.length;i++) {

                    var obj = new Object();
                    obj.to = req.body.title;
                    obj.from = req.session.email;
                    obj.message = req.body.message;
                    obj.fileName = files[i].filename;
                    obj.originalName = files[i].originalname;
                    obj.type = files[i].mimetype;
                    obj.entryDate = req.body.entryDate;

                        fileses.create(obj,function(error,res) {
                            if(error)
                            throw error;
                        })
                    }
                    res.send('true');
               }     
            }
    })
}

exports.Userupload = (req, res) => {
    multer.uploadUserImage(req,res, (err) => {
    if (err)
        res.send("format")
    else{
            if (req.file == undefined) {
                res.send('false');
            }
            else {
                req.session.photoname = '/' + req.file.filename;
                res.send('true');
            }     
        }
    })
}

exports.uploadmultipleWithoutLogin = (req, res) => {
    multer.upload(req,res, (err) => {
    if (err){ 
        res.send("format")
        }else{
           const files = req.files
              if(files.length == 0) {
                res.send('false');
               }
               else {
                    for(var i=0;i<files.length;i++)
                   {
                    var obj = new Object();
                    obj.to = req.body.emailTo;
                    obj.from = req.body.emailFrom;
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
               }     
        }
    })
}

exports.showSendFiles = (req, res) => {
    let query = {};
    let params = {};
   
   query = {from: req.session.email};

    if(req.body.search.value) {
        query["$or"]= [{
            "originalName":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "to":{ '$regex' : req.body.search.value, '$options' : 'i' }
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
                        fileses.countDocuments(function (err, totalCount)  {
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

exports.deleteSendFiles = (req,res) => {
     fileses.findOne({"_id" : req.body._id} ,function (err , data) {
     	fileses.deleteOne({ "_id" : req.body._id}, 
	    function(err,result) {
	        if(err)
	          throw err
	        else {
	        	var filePath = '../public/uploads/' + data.fileName;
				fs.unlinkSync(path.join(__dirname, filePath));
	            res.send("file deleted");
	        }
	    })
     });
}

exports.recentFiles = (req, res) => {
    let query = {};
    let params = {};
   
   query = {to: req.session.email,entryDate: req.body.entryDate};

    if(req.body.search.value) {
        query["$or"]= [{
            "originalName":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "to":{ '$regex' : req.body.search.value, '$options' : 'i' }
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
                fileses.countDocuments(query, function(err , filteredCount)  {
                    if(err)
                        console.log(err);
                    else {
                        fileses.countDocuments(function (err, totalCount)  {
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

exports.receivedFiles = (req, res) => {
    let query = {};
    let params = {};
   
   query = {to: req.session.email};

    if(req.body.search.value) {
        query["$or"]= [{
            "originalName":  { '$regex' : req.body.search.value, '$options' : 'i' }
        }, {
            "to":{ '$regex' : req.body.search.value, '$options' : 'i' }
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
                    else  {
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