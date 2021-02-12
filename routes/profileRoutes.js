const express = require('express');
const router  = express.Router();

const { mapsByUserID, favouritesByUserID } = require('../helpers/profileHelpers.js')

const bcrypt = require("bcrypt");
const saltRounds = 10



module.exports = (db) => {

  router.get("/", (req, res) => {
    if(req.session.user){
        let map_id;
        let map_name;
        let description;
      mapsByUserID(req.session.user)
      .then(output => {
        console.log("mapsByUserID", output.rows)

        map_id = output.rows.map_id;
        map_name = output.rows.map_name;
        description = output.rows.description;

      }).catch(err => {
        console.log("ERROR FROM mapsByUserID", err)
      })
      favouritesByUserID(req.session.user).then(output => {
        const templateVars = {
          map_id,
          map_name,
          description,
          favourite_id: output.rows.favourite_id,
          map_favourite_id: output.rows.map_favourite_id,
          table: output.rows,
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
