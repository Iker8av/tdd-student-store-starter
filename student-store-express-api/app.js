const express = require('express')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const store = require('./routes/store.js')
const data = require('./data/db.json')

const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use("/", store)

app.get('/store', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(data)
})

app.get('/store/:productId', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    data.products.map(item => {
        if (item.id == req.params.productId){
            res.status(200).send(item)
        }
    })

})

app.use((error, req, res, next) => {
    const {status, message} = error

    const errorObject = {
        status: status || 500,
        message: message || "Something wen't wrong in the application"
    }

    res.status(status).send({error: errorObject})
})

module.exports = app;
