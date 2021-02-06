const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("", (req, res) => {
    res.redirect("/maps");
  });

  router.get("login", (req, res) => {
    res.render("login");
  });

  router.get("register", (req, res) => {
    res.render("register");
  });

  router.post("login", (req, res) => {
  });

  router.post("register", (req, res) => {
  });


  return router;
};
