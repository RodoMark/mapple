const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10)

const { fetchUserByEmail, fetchUserByID, userExists, authenticateUser, registrationTripmine, addNewUser } = require('../helpers/userHelpers.js')

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
    if(!req.session.user) {
      res.render("register");
    } else {
      res.redirect("/maps")
    }
  });

  router.post("/login", (req, res) => {
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    console.log("BODY", req.body)

    if(!req.session.user) {
      if(userExists(incomingEmail)) {
        console.log("USER EXISTS")
        authenticateUser(incomingEmail, incomingPassword)
          .then(output => {
            console.log("OUTPUT", output)

          if(output){
            console.log("user authenticated!!")
            fetchUserByEmail(incomingEmail)
              .then(output => {
              req.session.user = output.id
              res.redirect("/profile")
              }).catch(err => console.error('query error', err.stack));

          } else {
            res.status(400)
            res.send('Login info incorrect.')
          }
        })
      } else {
        res.status(400)
        res.send('Login info incorrect.')
      }
    }
  });

  router.post("/register", (req, res) => {

    console.log("PASSWORD", req.body.password)

    details = {
      incomingName: req.body.handle,
      incomingEmail: req.body.email,
      incomingPassword: req.body.password
    }

    if(!registrationTripmine(details)) {
      console.log("NO TRIP MINE DETECTED")
      console.log("NOW HERE ARE THE DETAILS")
      console.log(details)

      const newUser = {
        name: details.incomingName || null,
        email: details.incomingEmail,
        password: details.incomingPassword,
      }


      req.session.cookie = newUser
      addNewUser(newUser)
      res.redirect("/maps")
    } else {
      res.status(400)
      res.send(registrationTripmine(details))
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null
    res.redirect("/maps")
  })


  return router;
};
