const express = require("express");
const router = express.Router();
const bcrypt =require('bcrypt')
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const LocalUser = require("../models/LocalUser");

/* GET home page. */
router.get("/", ensureGuest, (req, res) => {
  res.render("signup", { layout: "login", adcomMsg: req.session.adcomMsg });
  req.session.adcomMsg = null;
});

//Profile Update
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password === req.body.password1) {
      const userinfo = req.body;
      const userexist = await LocalUser.findOne({ email: userinfo.email });
      if (userexist===null) {
        userinfo.displayName=userinfo.firstName + " " + userinfo.lastName
        userinfo.password = await bcrypt.hash(userinfo.password, 10);
        delete userinfo.password1;
        console.log(userinfo);
        user = await LocalUser.create(userinfo);
        done(null, user)
        console.log(user);
        if (user) {
          req.session.adcomMsg = "Account created successfully.";
          res.redirect("/index");
        } else {
          req.session.adcomMsg = "Create account is failed!!!";
          res.redirect("/signup");
        }
      } else {
        req.session.adcomMsg = "Email Id already Exist!";
        res.redirect("/signup");
      }
    } else {
      req.session.adcomMsg = "Confirm Password Mismatch";
      res.redirect("/signup");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
