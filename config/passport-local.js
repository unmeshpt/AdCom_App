
const LocalStrategy = require('passport-local').Strategy;
const LocalUser = require('../models/LocalUser')
const bcrypt =require('bcrypt')
 
 //localuser passport
 module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField:email}),
      (email, password, done)=> {
        LocalUser.findOne({ email: email}, (err, user)=> {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          }else{
            return done(null, false, { message: 'Incorrect password.' });
          }
          
        });
      });
  
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user))
    })
    }