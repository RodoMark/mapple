// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const mapsByUserID = function (userID) {
  return db.query(
    `
    SELECT id as map_id, name as map_name, description, created_at as map_created_at
    FROM maps
    WHERE owner_id = $1
    `
  , [userID])
}

const favouritesByUserID = function (userID) {
  return db.query(
    `
    SELECT id as favourite_id, map_id as map_favourite_id, created_at as favourited_at
    FROM favourites
    WHERE user_id = $1
    `
  , [userID])
}




module.exports = {
  mapsByUserID,
  favouritesByUserID,
}


