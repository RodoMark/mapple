// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

// const userExists = function(email) {
//    return db.query(
//     `
//     SELECT *
//     FROM users
//     WHERE email = $1
//     ` ,
//     [email])
//       .then(output => {
//         return output
//       })

// }

const userExists = function(email) {

  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email]
  )
    .then((res) => {
      if (res) {
        console.log(res.rows[0])
        return res.rows[0];
      }
      return null;
    })
    .catch(err => console.error('query error', err.stack));
};

const checkObjectKeyLength = function (obj) {
    for (const key in obj) {
      if(key.length < 1) {
        return true
      }
    }

    return false
}

// REGISTRATION ERROR FINDER FUNCTION
const registerTripmine = function(details) {
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
  userExists,
  registerTripmine,
  addNewUser,
}


