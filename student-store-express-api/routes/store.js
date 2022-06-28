const express = require('express')
const router = express.Router()
const Store = require('../models/store')

router.post('/products', function (req, res) {
    res.send("Products");
})

router.post('/purchase', function (req, res) {
    res.send("Purchase");
})

module.exports = router
