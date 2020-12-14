const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//LocalUser Modals
const LocalUser = require("../models/LocalUser");

//localuser passport
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email",  passwordField: 'password' }, (email, password, done) => {
      //Match user
      LocalUser.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registared."
            });
          }
          //Match the Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log(id);
    LocalUser.findById(id, (err, user) => done(err, user));
  });
};
