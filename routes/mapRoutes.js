const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("maps_by_interest");
  });

  router.get("/:query", (req, res) => {
    db.query(
      // Search query goes here
      `

      `
    , [queryParams])
    res.render("map_show");
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

  });

  return router;
};
