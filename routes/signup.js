const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const LocalUser = require("../models/LocalUser");

/* GET home page. */
router.get("/", ensureGuest, (req, res) => {
  res.render("signup", { layout: "login", adcomMsg: req.session.adcomMsg });
  req.session.adcomMsg = null;
});

//Profile Update
router.post("/", (req, res) => {
  const {firstName, lastName, mobile, email, password, password1} = req.body;
  let errors = []
 
  //Check all reqierd filed
  // if(!firstName || !lastName || !mobile || !email || !password || !password1){
  //   errors.push({msg: 'Please fill in all fields'})
  // }

  //Check all reqierd filed
  if (password !== password1) {
    errors.push({ msg: "Password do not match" });
  }

  //Password min length 6
  if (password.length < 6) {
    errors.push({ msg: "Password minimum 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      firstName,
      lastName,
      mobile,
      email,
      password,
      password1
    });
  } else {
    //Validation passed
    LocalUser.findOne({email: email})
    .then(user=>{
      if(user){
        //Email exist
        errors.push({ msg: "Email id already registered" })
        res.render("signup", {
          errors,
          firstName,
          lastName,
          mobile,
          email,
          password,
          password1
        });

      }else{
        const newUser= new LocalUser({
          firstName,
          lastName,
          mobile,
          email,
          password
        });
        bcrypt.hash(newUser.password, 10,(err, hash)=>{
          if (err) throw err;
          
          //set password to hash
          newUser.displayName=firstName + " " + lastName
          newUser.password= hash;
          //save user
          newUser.save()
          .then(user=>{
            req.flash('success_msg', 'User registrade successfully, You can login')
            res.redirect('/')
          })
          .catch(err => console.log(err));
        });
      }
    });
  }
});

module.exports = router;
