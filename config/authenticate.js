module.exports.validate=(req,res,next)=>{
    if (req.session.loggedIn){
        next()
    }else {
        if (req.session.signupErr) {
          res.render('signup', { "signupErr": req.session.signupErr })
          req.session.signupErr = null
        } else {
          res.render('login', { "loggedIn": req.session.loggedIn, "loginErr": req.session.logginErr })
          req.session.logginErr = null
        }
    
      }
    
}

module.exports.rolecheckaddorder=(req,res,next)=>{
  if (req.session.loggedIn){
    if(req.session.admin){
      next()
    }else{
      req.session.noprivillage = "Only administrator can add or delete order type!!!"
      res.redirect('/admin-ordertypes')
     
    }   
  }else {
      if (req.session.signupErr) {
        res.render('signup', { "signupErr": req.session.signupErr })
        req.session.signupErr = null
      } else {
        res.render('login', { "loggedIn": req.session.loggedIn, "loginErr": req.session.logginErr })
        req.session.logginErr = null
      }
  
    }
  
}