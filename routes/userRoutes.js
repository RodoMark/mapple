const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("", (req, res) => {
    res.redirect("/maps");
  });

  router.get("login", (req, res) => {


  if(!req.session.user) {
    res.render("login");
  } else {
    res.redirect("/maps")
  }

  });

  router.get("register", (req, res) => {
    if(!req.session.user) {
      res.render("register");
    } else {
      res.redirect("/maps")
    }
  });

  router.post("login", (req, res) => {
    const incomingEmail = req.email;
    const incomingPassword = req.password;
  });

  router.post("register", (req, res) => {
    const incomingName = req.username
    const incomingEmail = req.email;
    const incomingPassword = req.password;
  });


  return router;
};
