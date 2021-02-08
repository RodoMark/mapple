const express = require('express');
const router  = express.Router();

// const bcrypt = require("bcrypt");
// const saltRounds = 10

const { fetchUserByEmail, fetchUserByID, userExists, authenticateUser, registerTripmine } = require('../helpers/userHelpers.js')

module.exports = (db) => {
  router.get("", (req, res) => {
    res.redirect("/maps");
  });

  router.get("/login", (req, res) => {
    if(!req.session.user) {
    res.render("login");
  } else {
    res.redirect("/maps")
  }

  });

  router.get("/register", (req, res) => {
    if(req.session.user) {
      res.render("register");
    } else {
      res.redirect("/maps")
    }
  });

  router.post("/login", (req, res) => {
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    if(!req.session.user) {
      if(userExists(incomingEmail)) {

        if(authenticateUser(incomingEmail, incomingPassword)) {
          fetchUserByEmail(incomingEmail)
            .then(output => {
              console.log("OUTPUT!", output)
              req.session.user = output.id
              res.redirect("/profile")
          }).catch(err => console.error('query error', err.stack));

        }

      } else {
        res.status(400)
        res.send('Login info incorrect.')
      }
    }
  });

  router.post("/register", (req, res) => {
    details = {
      incomingName: req.username,
      incomingEmail: req.email,
      incomingPassword: req.password
    }

    if(!registrationTripmine(details)) {

      const newUser = {
        name: details.incomingName || null,
        email: details.incomingEmail,
        password: bcrypt.hashSync(details.incomingPassword, saltRounds),
      }


      req.session.cookie = newUser
    } else {
      res.status(400)
      res.send(registrationTripmine(details))
    }
  });

  router.post("/logout", (req, res) => {
    req.session.user = null
    res.redirect("/maps")
  })


  return router;
};
