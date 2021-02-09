const express = require('express');
const router  = express.Router();


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

      res.render("map_show", templateVars)
    )
    ;
  });

  router.get("/latlng/:mapID", (req, res) => {
    return db.query(
      // Search query goes here
      `
      SELECT lat, lng
      FROM markers
      WHERE map_id = $1
      `
    , [req.body.mapID]).then(output => {
      res.send(JSON.stringify(output))
    }


    )
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
