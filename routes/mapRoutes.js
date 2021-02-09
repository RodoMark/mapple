const express = require('express');
const router  = express.Router();

const { fetchMarkersByMapID, clearMarker } = require('../helpers/mapHelpers.js')

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps_by_interest");
  });

  router.get("/example", (req, res) => {
    res.render("map_template");
  });

  router.get("/:search", (req, res) => {
    return db.query(
      // Search query goes here
      `
      SELECT map_id
      FROM maps
      JOIN interests ON interests.id = interest_id
      WHERE interests.name = $1
      `
    , [req.body.search]).then(

      res.render("map_show")
    )
    ;
  });

  router.get("/:mapID/points/", (req, res) => {
      return fetchMarkersByMapID(req.params.mapID)
      .then(output => {
          res.send(output.rows)
        })
    ;
  });




  router.get("/:id", (req, res) => {
    res.render("map_show");
  });

  router.get("/:id/edit", (req, res) => {
    res.render("edit_map");
  });

  router.post("/:id", (req, res) => {

  });

  router.delete("/maps/:map_id/markers/:marker_id", (req, res) => {
    clearMarker(req.params.marker_id)
    res.end()
  })

  router.post("/new", (req, res) => {
    db.query(

    )
  });

  return router;
};
