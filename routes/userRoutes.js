const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10

const { userExists } = require('../helpers/userHelpers.js')

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
        const fetchedUser = fetchUserByEmail(userDatabase, incomingEmail);
        const requestedPassword = fetchedUser.password;

        if (incomingPassword === userPassword) {
          res.session.user = fetchedUser
          res.redirect("/profile")
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
