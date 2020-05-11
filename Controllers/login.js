const bcrypt = require('bcrypt');
let saltRounds = 10

var users = require('../Models/userSchema');

exports.checkLogin = (req, res) => {
    req.session.isLogin = 0;

    users.findOne({email: req.body.email}, function(error,result) {
      if(error)
        throw error;

      if(!result) 
          res.send("not exits");
      else if(result.flag  == '0')
          res.send("deactivate");  
      else {
           bcrypt.compare(req.body.password,result.password,function(err,resi) {
            if(resi == true) {
              
                req.session.isLogin = 1;
                req.session.email = req.body.email;
                req.session.name = result.name;       
                req.session.password = result.password;
                req.session.phone = result.phone;       
                req.session.city = result.city;       
                req.session.dob = result.dob;
                req.session.gender = result.gender;       
                req.session.role = result.role;       
                req.session.status = result.status;       
                req.session.photoname = result.photoname;  
                if(result.dob == '-')
                  res.send("dobEmpty");
                else  {  
                  var re = req.session.redirectUrl || '/login/home';
                  res.send(re);
                }
            }
            else 
              res.send("false")
          }) 
        }
    })     
}

exports.changePassword = (req,res) => {
    bcrypt.hash(req.body.newpass, saltRounds, (err, hash) => {
              if(!err) {
                users.updateOne({"email" : req.session.email},{$set: { "password" : hash}} ,
                  function(error,result)
                  {
                    if(error)
                      throw error;
                    else
                      req.session.password = req.body.newpass;
                  })   
              }
              else {}
    }) 
    res.send("Password Changed Successfully")
}