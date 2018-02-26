const express = require('express')
const api = express.Router()

api
  .route('/admin/match/:id?')
  .post((req, res, next) => {
     
    const match = new Match(req.body)
      match.save()
        .then(data => res.json(data))
        .catch(err => { next(err) } )
     
  })
   .put((req, res, next) => {
     
     // logic to update Scores
     
  })


module.exports = api