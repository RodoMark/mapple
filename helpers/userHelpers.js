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
    .then((output) => {
        return output.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};

module.exports = {
  userExists
}
