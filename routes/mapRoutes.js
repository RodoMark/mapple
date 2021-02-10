const express = require('express');
const router  = express.Router();

const { fetchMarkersByMapID, deleteMarker, insertMarker } = require('../helpers/mapHelpers.js')

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps_by_interest");
  });

  router.get("/new", (req, res) => {
    res.render("new_map");
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

  router.delete("/:map_id/markers/:marker_id", (req, res) => {
    console.log("MARKER ID", req.params.marker_id)
    deleteMarker(req.params.marker_id)
    res.end()
  })

  router.put("/:map_id/markers/", (req,res) => {
    details = {
      map_id: req.params.map_id,
      lat: req.params.latlng.lat,
      lng: req.params.latlng.lng,
      title: req.params.title,
      description: req.params.title,
    }

    insertMarker(details)
  })

  router.post("/new", (req, res) => {
    db.query(
      details = {
        owner_id: req.session.id,
        interest_id: req.params.interest_id,
        name: req.params.name,
        name: req.params.description,
      }

    )
  });

  return router;
};

