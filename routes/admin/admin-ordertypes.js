var express = require('express');
var router = express.Router();
const authenticate = require("../../config/authenticate");
const usercrud = require("../../crudmodule/user_crud");

/* GET profile Page. */
router.get("/", authenticate.validate, (req, res, next) => {
  let userInfo = req.session.user;
  let noprivillage= req.session.noprivillage;
  let userRole = {
    superadmin: req.session.superadmin,
    admin: req.session.admin,
    staff: req.session.staff,
    client: req.session.client,
  };
  usercrud.getallOrderitems(userInfo._id).then((orderitems)=>{
    res.render('users/admin/admin-ordertypes', {
      userRole,
      userInfo,
      orderitems,
      noprivillage
    });
  })

  req.session.updateMsg=null;
  req.session.orderitems =null;
  req.session.noprivillage=null;
});

router.post("/addordertype",authenticate.validate, authenticate.rolecheckaddorder, (req,res, next)=>{
    usercrud.addOrderitem(req.body).then((response) => {
      if (response.status) {
          res.redirect("/admin-ordertypes");
      }
    })
});

router.get("/deleteordertype/:id",authenticate.validate, authenticate.rolecheckaddorder, (req,res, next)=>{
  let ordertypeId=req.params.id
  usercrud.deleteOrdertype(ordertypeId).then((response) => {
    if (response.status) {
        res.redirect("/admin-ordertypes");
    }
  })
});

module.exports = router;