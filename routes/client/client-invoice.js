var express = require('express');
var router = express.Router();
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
  res.render('users/client/client-invoice', {
    userRole,
    userInfo,
    updateMsgDone
  });
  req.session.updateMsg=null;
});

module.exports = router;