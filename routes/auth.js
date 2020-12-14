const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/index");
  }
);

//@desc Local auth Callback
//@route Get /auth/login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  }),(req, res, next)=>{
    
  });

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/",
//     failureFlash: true,
//   })(req, res, next);
// });

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
