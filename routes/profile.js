const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('<h1>To jest strefa psychologa</h1>'))

module.exports = router
