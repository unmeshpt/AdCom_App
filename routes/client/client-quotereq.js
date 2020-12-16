var express = require("express");
var router = express.Router();
const usermodule = require("../../crudmodule/usermodule");
const { ensureAuth } = require("../../middleware/auth");
const Ordertype=require('../../models/Ordertypes')

router.get("/", ensureAuth,  (req, res, next) => {
  let userInfo = req.user;
  usermodule.checkRole(userInfo).then(async (userrole) => {
    try {
      let allordertypes= await Ordertype.find({}).lean()
      res.render("users/client/client-askquote", {userInfo, allordertypes, userrole});
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  });
});
//   usercrud.getallOrderitems().then((allordertypes) => {
//     res.render("users/client/client-askquote", {
//       userRole,
//       userInfo,
//       allordertypes,
//       adcomMsg
//     });
//     req.session.adcomMsg=null;
//   });
// });

router.post("/quotationrequest", function (req, res, next) {
  req.body.UserId=req.session.user._id
  req.body.Name=req.session.user.First_Name + " " + req.session.user.Last_Name
  req.body.Mobile=req.session.user.Mobile
  req.body.Status="Pending"
  req.body.Read="Unread"
  var date=new Date()
  req.body.Date=date.toLocaleString();
  // console.log(req.session.user);
  console.log(req.body);
  usercrud.sendquoterequest(req.body).then((response) => {
    if (response.status) {
        req.session.adcomMsg = "Quotation request send successfully!";
        res.redirect("/client-askquote");
    }
  })
});

module.exports = router;
