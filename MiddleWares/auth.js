module.exports=(req,res,next)=>{

  if(req.session.isLogin)
  {
    next();
  }
  else {
  	req.session.redirectUrl = req.originalUrl;
    res.redirect('/');
  }
}