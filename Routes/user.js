let express = require('express');
var app = require('express').Router();
let path = require('path');
var multer=require('multer');
var fs = require('fs');

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.static(path.join(__dirname,'../public/uploads')));

var mongoose = require('mongoose')
var auth=require('../MiddleWares/auth');
var fileses = require('../Models/fileSchema');



function sanitizeFile(file, cb) {

    let fileExts = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());

    if(isAllowedExt){
        return cb(null ,true) 
    }
    else{
       cb('Error: File type not allowed!')
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      var photoname =file.originalname;
      cb(null, photoname)
    }
})

   
  var upload = multer({ storage: storage ,

    fileFilter: function (req, file, cb) {
    sanitizeFile(file, cb);
      
    }
}).array('myFiles')


app.get('/uploadFile',auth, function(req,res) {
	res.render('uploadFile',{data : req.session});
})


app.post('/uploadmultiple', function(req, res) {

upload(req,res, (err) => {

    if (err){ 
        res.send("format")
        }else{
           const files = req.files
              if(files.length == 0) {
                res.send('false');
               }
               else
               {
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
               }
               
        }

})

 });

app.get('/sendFileRecords',auth, function(req,res) {
	res.render('sendFileRecords',{data : req.session});
})

app.post('/showSendFiles',auth,function(req, res) {
    let query = {};
    let params = {};
   
   query = {from: req.session.email};

    if(req.body.search.value)
    {
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

app.post('/deleteSendFiles',auth,function(req,res) {
     fileses.findOne({"_id" : req.body._id} ,function (err , data) {
     	fileses.deleteOne({ "_id" : req.body._id}, 
	    function(err,result) {
	        if(err)
	          throw err
	        else
	        {
	        	var filePath = '../public/uploads/' + data.fileName;
				fs.unlinkSync(path.join(__dirname, filePath));
	            res.send("file deleted");
	        }
	    })
     });
})


app.get('/downloadSendFiles/:pro',function(req,res) {
	var filePath = '../public/uploads/' + req.params.pro.toString();
	res.download(path.join(__dirname, filePath));
})

app.get('/recentFiles',auth, function(req,res) {
	res.render('recentFiles',{data : req.session});
})

app.post('/recentFiles',auth,function(req, res) {
    let query = {};
    let params = {};
   
   query = {to: req.session.email,entryDate: req.body.entryDate};

    if(req.body.search.value)
    {
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

app.get('/receivedFiles',auth, function(req,res) {
	res.render('receivedFiles',{data : req.session});
})

app.post('/receivedFiles',auth,function(req, res) {
    let query = {};
    let params = {};
   
   query = {to: req.session.email};

    if(req.body.search.value)
    {
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

module.exports = app;