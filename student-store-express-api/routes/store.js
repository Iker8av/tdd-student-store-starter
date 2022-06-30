const express = require('express')
const router = express.Router()
const Store = require('../models/store')
const data = require('../data/db.json')
const { NotFoundError } = require('../utils/errors.js')

router.post('/purchases', async (req, res) => {
    try {
        console.log('req.body.newPurchase: ', req.body.postRequest);
        const newPurchase = Store.recordPurchase(req.body.postRequest)
        res.status(201).json({ purchase: newPurchase })
    }
    catch{
        console.log("Error")
    }
})

router.get('/', function (req, res) {
    res.status(200).send(data)
})

router.get('/:productId', function (req, res) {
    data.products.map(item => {
        if (item.id == req.params.productId){
            res.status(200).send({"product" : item})
        }
    })
})

module.exports = router
