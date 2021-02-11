// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const fetchUserProfile = function (userID) {
  return db.query(
    `
    SELECT maps.id as map_id, maps.owner_id, maps.name as map_name, favourites.id as favourite_id, maps.created_at as map_created_at, favourites.created_at as favourite_created_at
    FROM maps
    JOIN users on users.id = owner_id
    JOIN favourites on favourites.user_id = user_id
    WHERE maps.owner_id = $1
    ORDER BY maps.last_edited
    `
  , [userID])
}






module.exports = {
  fetchUserProfile
}


