// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

const userExists = function(email) {
  return db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `
  , [email])
      .then(output => {
        if(output.rows.email) {
          return true
        } else {
          return false
        }
      }
    ).catch(err => {
      return('error', err)
    })

}
