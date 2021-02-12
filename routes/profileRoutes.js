const express = require('express');
const router  = express.Router();

const { mapsByUserID, favouritesByUserID } = require('../helpers/profileHelpers.js')

const bcrypt = require("bcrypt");
const saltRounds = 10



module.exports = (db) => {

  router.get("/", (req, res) => {
    if(req.session.user){
        let userTable
        let favouritesTable

      mapsByUserID(req.session.user)
      .then(output => {
        console.log("mapsByUserID00000000------>>>>>>", output.rows)

        userTable = output.rows


      }).catch(err => {
        console.log("ERROR FROM mapsByUserID", err)
      })
      favouritesByUserID(req.session.user).then(output => {
        console.log("mapsByFavouriteID00000000------>>>>>>", output.rows)
        favouritesTable = output.rows

        const templateVars = {
          userTable,
          favouritesTable,
          userInfo: req.session.user,
        }
        res.render("user_profile", templateVars)
      }).catch(err => {
        console.log("ERROR FROM favouritesByUserID", err)
      })

    } else {
      res.redirect("/maps")
    }

  });





  return router;
};
