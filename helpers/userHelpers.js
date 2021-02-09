// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);


//CHECKS IF THE USER IS IN OUR DATABASE
const userExists = function(email) {

  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email]
  )
    .then((output) => {
        return output.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};

// CHECKS PASSWORD AGAINST EMAIL
const authenticateUser = function(incomingEmail, incomingPassword) {
  return db.query(
    `
    SELECT password
    FROM users
    WHERE email = $1
    `, [incomingEmail]
    ).then(output => {
      if(output.rows[0].password === incomingPassword) {
        return true
      }
    })
    .catch(err => console.error('query error', err.stack));

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
  db.query(
    `
    SELECT id, name, email
    FROM users
    WHERE id = $1
    `
  , [userID]
  ).then(output => {
    return {
      id: output.rows[0].id,
      name: output.rows[0].name,
      email: output.rows[0].email,
      }
    }
  ).catch(err => console.error('query error', err.stack));

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

  if (userExists(details.incomingEmail)) {
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
    name: incomingName || null,
    email: details.incomingEmail,
    password: bcrypt.hashSync(details.incomingPassword, saltRounds),
  };

  return newUser;
};

module.exports = {
  authenticateUser,
  userExists,
  fetchUserByEmail,
  fetchUserByID,
  registrationTripmine,
  addNewUser,
}


