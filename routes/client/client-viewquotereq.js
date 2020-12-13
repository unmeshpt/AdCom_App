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
  usercrud.getallQuoterequest(userInfo._id).then((allrequestedQuote) => {
    res.render("users/client/client-requested-quote", {
      userRole,
      userInfo,
      allrequestedQuote,
      adcomMsg,
    });
    req.session.adcomMsg = null;
  });
});

router.get(
  "/deletequoterequest/:id",
  authenticate.validate,
  (req, res, next) => {
    let quotenrequestId = req.params.id;
    usercrud.deleteQuoterequest(quotenrequestId).then((response) => {
      if (response.status) {
        req.session.adcomMsg =
          "Selected quotation request deleted successfully";
        res.redirect("/client-viewquotereq");
      }
    });
  }
);

//update order type
router.post("/update-userquotereq/:id", (req, res) => {
  req.body.Id = req.params.id;
  usercrud.updatequoterequest(req.body).then((response) => {
    if (response) {
      req.session.adcomMsg = "Ordertype Updated successfully";
      res.redirect("/client-viewquotereq");
    } else {
      req.session.adcomMsg = "Ordertype Updation failed!!!";
      res.redirect("/client-viewquotereq");
    }
  });
});

//get quote ids data
router.get("/editquoterequest/:id", authenticate.validate, (req, res, next) => {
  let quoteId = req.params.id;
  console.log(quoteId);
  usercrud.getuserQuoterequest(quoteId).then((quoteInfo) => {
    if (quoteInfo) {
      req.session.quoteinfo = quoteInfo;
      res.redirect("/client-editquotereq");
    } else {
      req.session.adcomMsg = "Ordertype not found!!!";
      res.redirect("/client-viewquotereq");
    }
  });
});

module.exports = router;
