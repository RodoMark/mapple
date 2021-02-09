// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);


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
