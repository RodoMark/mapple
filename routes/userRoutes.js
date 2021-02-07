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
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    if(!req.session.user) {
      if(emailExists(incomingEmail)) {
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

  router.post("register", (req, res) => {
    const incomingName = req.username
    const incomingEmail = req.email;
    const incomingPassword = req.password;
  });


  return router;
};
