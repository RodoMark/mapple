// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const mapsByUserID = function (userID) {
  return db.query(
    `
    SELECT maps.id as map_id, maps.name as map_name, interests.name as interest_name, maps.description, maps.created_at as map_created_at
    FROM maps
    JOIN interests ON interests.id = interest_id
    WHERE owner_id = $1
    `
  , [userID])
}

const favouritesByUserID = function (userID) {
  return db.query(
    `
    SELECT favourites.id as favourite_id, favourites.map_id as map_favourite_id, favourites.created_at as favourited_at, interests.name as interest_name
    FROM favourites
    JOIN maps ON maps.id = map_id
    JOIN interests ON interests.id = interest_id
    WHERE favourites.user_id = $1
    `
  , [userID])
}




module.exports = {
  mapsByUserID,
  favouritesByUserID,
}


