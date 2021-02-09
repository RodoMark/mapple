// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams)c

const fetchMapsByUserID = function(userID) {
  return db.query(
  `
  SELECT id
  FROM maps
  WHERE owner_id = $1
  `
  , [userID])
}

const fetchMarkersByMapID = function(mapID) {
  return db.query(
    `
    SELECT id, lat, lng
    FROM markers
    WHERE map_id = $1
    `, [mapID])

}

const clearMarker = function(markerID) {
  return db.query(
    `
    DELETE FROM markers
    WHERE marker_id = $1
    `, [mapID])

}


module.exports = {
  fet
chMarkersByMapID,
  clearMarker


}
maps/
