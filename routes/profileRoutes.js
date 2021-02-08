const express = require('express');
const router  = express.Router();

// const bcrypt = require("bcrypt");
// const saltRounds = 10

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("user_profile");
  });
  return router;
};
