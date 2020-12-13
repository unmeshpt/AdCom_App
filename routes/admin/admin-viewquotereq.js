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
    usercrud.getalladminQuoterequest().then((allrequestedQuote) => {
      res.render("users/admin/admin-inboxquotereq", {
        userRole,
        userInfo,
        allrequestedQuote,
        adcomMsg,
      });
      req.session.adcomMsg = null;
    });
});

// router.get(
//   "/proceedquoterequest/:id",
//   authenticate.validate,
//   (req, res, next) => {
//     let quotenrequestId = req.params.id;
//     usercrud.deleteQuoterequest(quotenrequestId).then((response) => {
//       if (response.status) {
//         req.session.adcomMsg =
//           "Selected quotation request deleted successfully";
//         res.redirect("/admin-viewquotereq");
//       }
//     });
//   }
// );

module.exports = router;
