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

const registerTripmine = function(details) {

}

module.exports = {
  userExists,
  registerTripmine,
}

userExists('glenman@mail.com')
