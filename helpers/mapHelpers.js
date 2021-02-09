// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);

const fetchMapsByUserID = function(userID) {
  return db.query(
  `
  SELECT id
  FROM maps
  WHERE owner_id = 1
  `
  , [userID]).then(output => {
    return {
      lat: output.rows[0].lat,
      lng: output.rows[0].lng}
  }

  )
}

const fetchMarkersByMapID = function(mapID) {
  return db.query(
    `
    SELECT lat, lng
    FROM markers
    WHERE map_id = $1
    `, [mapID])

}

module.exports = {
  fetchMarkersByMapID,
}
