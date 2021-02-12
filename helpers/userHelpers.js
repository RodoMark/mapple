// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10)


//CHECKS IF THE USER IS IN OUR DATABASE
const userExists = function(email) {

  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email]
  )
    .then((output) => {
        return output.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

// CHECKS PASSWORD AGAINST EMAIL
const authenticateUser = function(incomingEmail, incomingPassword) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `, [incomingEmail]
    ).then(output => {

      if(output.rows[0].password === incomingPassword) {

        console.log("ENCRYPTED", output.rows[0].password)
        return true
      }
    })
    .catch(err => console.error('query error', err));

}

// FETCHES USER INFO BY EMAIL SO WE CAN MAKE A COOKIE
const fetchUserByEmail = function(incomingEmail){
  return db.query(
    `
    SELECT id, name, email
    FROM users
    WHERE email = $1
    `
  , [incomingEmail]
  ).then(output => {

    return {
      id: output.rows[0].id,
      name: output.rows[0].name,
      email: output.rows[0].email,
      }
    }
  ).catch(err => console.error('query error', err.stack));

}

// FETCHES USER INFO BY EMAIL SO WE CAN MAKE A COOKIE
const fetchUserByID = function(userID){
  return db.query(
    `
    SELECT id, name, email
    FROM users
    WHERE id = $1
    `
  , [userID]
  )
}

// CHECKS IF OBJECT KEY HAS AT LEAST 1 CHARACTER
const checkObjectKeyLength = function (obj) {
    for (const key in obj) {
      if(key.length < 1) {
        return true
      }
    }

    return false
}

// REGISTRATION ERROR FINDER FUNCTION
const registrationTripmine = function(details) {
  let message = null;

  if (userExists(details.incomingEmail).length) {
    message = `User with the email ${details.incomingEmail} already exists. Please enter a different one.`;
  } else if (
    checkObjectKeyLength(details)
  ) {
    message = `One or more fields are empty`;
  } else if (!details.incomingEmail.includes("@")) {
    message = "Improperly formatted email address.";
  }

  return message;

}

const addNewUser = function (details) {

  const newUser = {
    name: details.name || null,
    email: details.email,
    password: details.password,
  }

  return db.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    `
  , [newUser.name, newUser.email, newUser.password])
};

module.exports = {
  fetchUserByID,
  authenticateUser,
  userExists,
  fetchUserByEmail,
  fetchUserByID,
  registrationTripmine,
  addNewUser,
}
