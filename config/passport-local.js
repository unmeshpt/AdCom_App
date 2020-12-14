
const LocalStrategy = require('passport-local').Strategy;
const bcrypt =require('bcrypt')

//LocalUser Modals
const LocalUser = require('../models/LocalUser')
 
 //localuser passport
 module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    //Match user
      LocalUser.findOne({email: email})
      .then(user=>{
        console.log(user);
        if(!user) {
          return done(null, false, { msg: 'Incorrect email or email not found.' });
        }
        //Match the Password
        bcrypt.compare(password, user.password,(err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
              return done(null, user);
            }else{
              return done(null, false, { msg: 'Incorrect password.' });
            }
        });
      })
      .catch(err =>console.log(err));
  }))
  passport.serializeUser((user, done) => {done(null, user.id)})
    passport.deserializeUser((id, done) => {
      LocalUser.findById(id, (err, user) => done(err, user))
    })
}