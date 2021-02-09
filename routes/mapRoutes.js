const express = require('express');
const router  = express.Router();

const { fetchMarkersByMapID } = require('../helpers/mapHelpers.js')

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

  router.get("/:mapID/latlng/", (req, res) => {

      // Search query goes here
      // console.log('querying markers', req.params)
      return fetchMarkersByMapID(req.params.mapID)
      .then(output => {
      //     console.log("SENDING MAP COORDINATES")
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

  router.post("/new", (req, res) => {
    db.query(

    )
  });

  return router;
};
