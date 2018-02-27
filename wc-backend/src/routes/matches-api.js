const express = require('express')
const api = express.Router()
const Match = require('../models/match')

api
  .route('/matches')
  .get((req, res, next) => {
     Match.find().exec()
        .then(matches => res.json(matches))
        .catch(err => next(err))       
  })

module.exports = api