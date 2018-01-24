const express = require('express')
const bodyParser = require('body-parser')
const teamsApi = require('./src/routes/teams-api')
const mongooseConfig = require('./src/config/mongoose-connection')
const app = express()

app.use(bodyParser.json())
app.use(teamsApi)

app.use((err, req, res, next) => {
    let STATUS = 500

    if (err.message.match(/not found/)) {
        STATUS = 400
    }

    return res.status(STATUS).send({ error: err.message })
})
  

app.listen(3000, () => {
    console.log('running on port: 3000')
})