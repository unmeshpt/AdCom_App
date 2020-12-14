const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/index", ensureAuth, async (req, res) => {

  try {
    if (req.user.role === "CLIENT") {
      req.session.userClient = true;
    }
    res.render("index", {
      userInfo: req.user,
      adcomMsg: req.session.adcomMsg,
      userClient: req.session.userClient,
    });
    req.session.adcomMsg = null;
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
  
});


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const passport=require('passport-remember-me')
// const usercrud = require("../crudmodule/user_crud");
// const authenticate = require("../config/authenticate");

// /* GET home page. */
// router.get("/", authenticate.validate, (req, res) => {
//   let userInfo = req.session.user;
//   let userRole = {
//     superadmin: req.session.superadmin,
//     admin: req.session.admin,
//     staff: req.session.staff,
//     client: req.session.client,
//   };
//   let status= "Unread"
//   usercrud.getcountQuoterequest(status).then((countnotify) => {
//   res.render("index", { userRole, userInfo, countnotify });
//   });
// });

// //Profile Update
// router.post("/signup", (req, res) => {
//   if (req.body.Password === req.body.Password1) {
//     const userinfo = req.body;
//     delete userinfo.Password1;
//     userinfo.Role = "CLIENT";
//     userinfo.Designation = "User";
//     var date = new Date();
//     userinfo.Join_Date = date.toLocaleString();
//     usercrud.signupUser(userinfo).then((response) => {
//       if (response.status) {
//         req.session.loggedIn = true;
//         req.session.user = response.userData;
//         res.redirec("/");
//       }
//       if (response.userexist) {
//         req.session.signupErr = "Email Id already Exist!";
//         res.redirect("/");
//       }
//     });
//   } else {
//     req.session.signupErr = "Confirm Password Mismatch";
//     res.redirect("/");
//   }
// });

// router.get("/login", (req, res) => {
//   res.render("login");
//   //res.redirect('users-elements/signup')
// });

// /*Logout Session */
// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

// /*Post login info to here*/
// router.post("/login", (req, res) => {
//   req.session.superadmin = false;
//   req.session.admin = false;
//   req.session.staff = false;
//   req.session.client = false;
//   usercrud.loginUser(req.body).then((response) => {
//     if (response.status) {
//       if (response.user["Role"] == "SUPERADMIN") {
//         (req.session.superadmin = true), (req.session.loggedIn = true);
//       }
//       if (response.user["Role"] == "ADMIN") {
//         (req.session.admin = true), (req.session.loggedIn = true);
//       }
//       if (response.user["Role"] == "STAFF") {
//         (req.session.staff = true), (req.session.loggedIn = true);
//       }
//       if (response.user["Role"] == "CLIENT") {
//         (req.session.client = true), (req.session.loggedIn = true);
//       }
//       req.session.user = response.user;
//       res.redirect("/");
//     } else {
//       req.session.logginErr = "Invalid Email or Password!!!";
//       res.redirect("/");
//     }
//   });
// });

// //Add Todo
// router.post("/add-todo", (req, res) => {
//   req.body.Added_By = req.session.user["_id"];
//   req.body.Status = "Pending";
//   usercrud.addtodo(req.body).then((response) => {
//     if (response.status) {
//       res.redirect("/");
//     }
//   });
// });

// // //View Todo
// // router.get("/view-todo/:id", async (req, res) => {
// //   let todo = await usercrud.getselectedtodo(req.params.id);
// //   res.json(todo);
// //   // req.session.modalview=true
// //   //   req.session.todo=todo
// //   //  res.redirect('/')
// // });

// // router.get("/todo", (req, res) => {
// //   res.redirect("/");
// // });

// module.exports = router;
