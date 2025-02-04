const express = require('express')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const store = require('./routes/store.js')
const data = require('./data/db.json')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use("/store", store)

app.use((error, req, res, next) => {
    const {status, message} = error

    const errorObject = {
        status: status || 500,
        message: message || "Something wen't wrong in the application"
    }

    res.status(status).send({error: errorObject})
})

module.exports = app;
