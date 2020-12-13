var express = require("express");
var router = express.Router();
const usercrud = require("../../crudmodule/user_crud");
const authenticate = require("../../config/authenticate");

/* GET profile Page. */
router.get("/", authenticate.validate, (req, res, next) => {
  let userInfo = req.session.user;
  let userRole = {
    superadmin: req.session.superadmin,
    admin: req.session.admin,
    staff: req.session.staff,
    client: req.session.client,
  };
  const updateMsgDone = req.session.updateMsg;
  res.render("users/client/client-profile", {
    userRole,
    userInfo,
    updateMsgDone
  });
  req.session.updateMsg=null;
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
