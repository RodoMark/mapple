// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const mapsByUser = function (ownerID) {
  return db.query(
    `
    SELECT id
    FROM maps
    JOIN users on users.id = owner_id
    WHERE owner_id = ownerID
    ORDER BY maps.last_edited
    `
  , [userID]).then(output => {
    return output.rows
  })


};

const userFavourites = function (userID) {
  return db.query(
    `
    SELECT map_id
    FROM favourites
    JOIN users ON users.id = user_id
    WHERE user_id = $1
    ORDER BY created_at
    `
  , [userID]).then(output => {
    return output.rows
  })


};

module.exports = {
  userFavourites,
  mapsByUser,
}


