const express = require('express')
const jwt = require('jsonwebtoken')
const api = express.Router()

const logIn = (username, password)  => {
    if (username == 'admin' && password == 'admin') {
        
        let userData = {
            name: "Admin"
        }
        
        return generateToken(userData)
        
    } else {
        return null
    }
    
}

const generateToken = (userData) => {
   return jwt.sign(userData, "s3cret", { expiresIn: '3h' })
}


api
  .route('/auth')
  .post((req, res, next) => {
      console.log(req.body)
    let { username, password } = req.body
    let token = logIn(username, password)
    if (token) {
        res.send(token)
    } else {
        next(new Error("Authentication failed"))
    }
  })


module.exports = api
