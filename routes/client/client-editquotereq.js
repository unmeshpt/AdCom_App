var express = require("express");
var router = express.Router();
const authenticate = require("../../config/authenticate");
const usercrud = require("../../crudmodule/user_crud");

router.get("/", authenticate.validate, (req, res, next) => {
  let userInfo = req.session.user;
  let userRole = {
    superadmin: req.session.superadmin,
    admin: req.session.admin,
    staff: req.session.staff,
    client: req.session.client,
  };
  const adcomMsg = req.session.adcomMsg;
  let quoteInfo = req.session.quoteinfo;
  console.log(quoteInfo);
  console.log(userInfo);
  usercrud.getallOrderitems().then((allordertypes) => {
    res.render("users/client/client-editquote", {
      userRole,
      userInfo,
      quoteInfo,
      adcomMsg,
      allordertypes
    });
    req.session.adcomMsg = null;
    req.session.quoteinfo = null;
  });
});


module.exports = router;
