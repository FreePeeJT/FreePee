const router = require("express").Router();
const User = require("../models/user");
const Spot = require("../models/spot");
router
  .get("/", function(req, res) {
    if(req.user){
        User.findById(req.user.uid).then(user => {
            res.render("index", {
              title: "Home",
              user: user
            });
          });
    }
    else{
        res.render("index", {
            title: "Home"
          });
    }
  })
  .get("/logout", function(req, res) {
    req.logout();
    req.session = null; //Remove session from sessionStore
    res.redirect("/");
  });

module.exports = router;
