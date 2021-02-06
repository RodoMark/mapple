const express = require('express')
const router = express.Router();

module.exports =
router
  .get('/maps', (req, res) => {
    const templateVars = {}
    res.render('index', templateVars)
  })
;
