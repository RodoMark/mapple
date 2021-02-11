const express = require('express');
const router  = express.Router();

const { fetchUserProfile } = require('../helpers/profileHelpers.js')

const bcrypt = require("bcrypt");
const saltRounds = 10



module.exports = (db) => {

  router.get("/", (req, res) => {
    if(req.session.user){
      fetchUserProfile(req.session.user)
        .then(output => {
          console.log(output.rows)
          const templateVars = {
            table: output.rows
          }
          res.render("user_profile", templateVars)
        }


        )
    } else {
      res.redirect("/maps")
    }

  });





  return router;
};
