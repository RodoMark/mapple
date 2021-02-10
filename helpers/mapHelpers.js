// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams)

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

const deleteMarker = function(markerID) {
  return db.query(
    `
    DELETE FROM markers
    WHERE id = $1
    `, [markerID])

}

const insertMarker = function(details) {
  return db.query(
    `
    INSERT INTO markers
    VALUES ($1, $2, $3, $4, $5)
    `, [details.map_id, details.lat, details.lng, details.title, details.description])
}



module.exports = {
  fetchMapsByUserID,
  fetchMarkersByMapID,
  deleteMarker,
  insertMarker,
}




