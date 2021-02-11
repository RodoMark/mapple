const express = require('express');
const router  = express.Router();

const { fetchMapByMapID, fetchMapsByUserID, fetchMarkersByMapID, fetchMapByInterestName, deleteMarker, insertMarker, addFavourite, removeFavourite } = require('../helpers/mapHelpers.js')

const { fetchUserByID } = require('../helpers/userHelpers.js')

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

  router.get("/search/:interestName", (req, res) => {
    fetchMapByInterestName(req.params.interestName)
      .then(output => {
        const table = output.rows[0]
        console.log(table)

        const templateVars = {
          map_id: table.map_id,
          user_id: table.user_id,
          interest_id: table.interest_id,
          name: table.name,
          created_at: table.create_at,
        }

        res.render("maps_by_interest", templateVars)
      }


      )



  });

  router.get("/:mapID/points/", (req, res) => {
      return fetchMarkersByMapID(req.params.mapID)
      .then(output => {
          res.send(output.rows)
        })
    ;
  });

  router.get("/editmap", (req, res) => {
    res.render("edit_map");

    //:id/edit
  });

  router.get("/:mapID", (req, res) => {
    fetchMapByMapID(req.params.mapID)
    .then(output => {
      const table = output.rows[0]
      const templateVars = {
        map_id: table.id,
        user_id: table.user_id,
        interest_id: table.interest_id,
        name: table.name,
        description: table.description,
        created_at: table.created_at,
        last_edited: table.last_edited
      }

      res.render("specific_map", templateVars);
    })
  });

  router.get("/specific", (req, res) => {
    res.render("specific_map");
  })

  router.post("/:mapID", (req, res) => {
  });

  router.post("/:mapID/markers/:markerID/delete", (req, res) => {
    console.log("MARKER ID", req.params.markerID)
    deleteMarker(req.params.markerID)
    res.redirect(`/maps/${req.params.mapID}`)

  })


  router.post("/:mapID/markers/", (req,res) => {
    console.log(req.body)
    details = {
      map_id: Number(req.params.mapID),
      lat: Number(req.body.lat),
      lng: Number(req.body.lng),
      title: req.body.title,
      description: req.body.description,
    }

    insertMarker(details)

    res.redirect(`/maps/${req.params.mapID}`)

  })

  router.post("/:mapID/favourites/add", (req, res) => {
    if(req.session.user) {
      console.log("REQ PARAMS", req.params)
      const incomingMapID = req.params.mapID
      console.log("MAP ID", incomingMapID)

      fetchUserByID(req.session.user)
        .then(output => {

          const table = output.rows[0]

          const details = {
            mapID: Number(incomingMapID),
            userID: Number(table.id),
            }
            console.log(`FAVOURITING ${details.mapID} by ${details.userID}!!!`)
            addFavourite(details)
            res.redirect(req.get('referer'));
          }
        )
    } else {
      res.redirect('/auth/login')
    }

  });

  router.post("/:mapID/favourites/remove", (req, res) => {

    const details = {
    userID: req.params.userID,
    mapID: req.params.mapID
    }

    removeFavourite(details)
    res.redirect(req.get('referer'));
  });

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

