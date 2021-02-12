// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams)

const fetchMapByMapID = function(mapID) {
  return db.query(
  `
  SELECT id as map_id, owner_id as user_id, interest_id, name, description, lat_start, lng_start, zoom, created_at
  FROM maps
  WHERE id = $1
  `
  , [mapID])
}

const fetchMarkersByMapID = function(mapID) {
  return db.query(
    `
    SELECT id as marker_id, map_id, lat, lng, title, description, created_at
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
    INSERT INTO markers (map_id, lat, lng, title, description)
    VALUES ($1, $2, $3, $4, $5)
    `, [details.map_id, details.lat_start, details.lng_start, details.title, details.description])
}

const insertMap = function(details) {

  return db.query(
    `
    INSERT INTO maps (owner_id, interest_id, lat_start, lng_start, zoom, name, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [details.owner_id, details.interest_id, details.lat_start, details.lng_start, details.zoom, details.name, details.description])
}

const deleteAllMarkers = function(mapID) {
  return db.query(
    `
    DELETE FROM markers
    WHERE map_id = $1
    `, [mapID])

}

const deleteMap = function(mapID) {
  return db.query(
    `
    DELETE FROM maps
    WHERE id = $1
    `, [mapID])

}

const fetchMapByInterestName = function(interestID) {
  return db.query(
    `
    SELECT maps.id as map_id, maps.owner_id as user_id, interests.name as interest_name, maps.name, maps.created_at
    FROM maps
    JOIN interests ON interests.id = interest_id
    WHERE interests.name = $1
    `, [interestID])

}


const fetchMapsByUserID = function(userID) {
  return db.query(
  `
  SELECT id
  FROM maps
  WHERE owner_id = $1
  `
  , [userID])
}

const fetchFavouritesByUserID = function(userID) {
  return db.query(
    `
    SELECT id FROM favourites
    WHERE user_id = $1
    `, [userID])
}

const addFavourite = function(details) {
  return db.query(
    `
    INSERT INTO favourites (user_id, map_id)
    VALUES ($1, $2
    `, [details.userID, details.mapID])
}

const removeFavourite = function(details) {
  return db.query(
    `
    DELETE FROM favourites
    WHERE user_id = $1 AND map_id = $2
    `, [details.userID, details.mapID])
}

module.exports = {
  deleteMap,
  insertMap,
  addFavourite,
  removeFavourite,
  fetchMapByMapID,
  fetchMapsByUserID,
  fetchMarkersByMapID,
  fetchMapByInterestName,
  deleteMarker,
  insertMarker,
  deleteAllMarkers,
}






