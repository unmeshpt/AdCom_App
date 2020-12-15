var express = require("express");
var router = express.Router();
const usermodule = require("../../crudmodule/usermodule");
const { ensureAuth } = require("../../middleware/auth");

/* GET profile Page. */
router.get("/", ensureAuth, (req, res, next) => {
  let userInfo = req.user;
  usermodule.checkRole(userInfo).then((userrole) => {
    try {
      res.render("users/client/client-profile", {userInfo, userrole});
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  });
});

//update product
router.post("/update-profile", (req, res) => {
  req.session.user = null;
  let userId=req.body.UserId
  usercrud.updateprofile(req.body).then((response) => {
    if (response) {
      usercrud.fineOne(userId).then((user) => {
        req.session.user = user;
        req.session.updateMsg = "Profile updation successful!";
        res.redirect("/client-profile");
        if (req.files.Avatar){
          let image=req.files.Avatar
          image.mv('./public/img/portfolio/'+userId+'.jpg')
        }
      });
    } else {
      req.session.updateMsg = "Profile updation failed!!!";
      res.redirect("/client-profile");
    }
  });
});

module.exports = router;
