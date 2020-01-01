const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    console.log('cookies',)
    if (req.cookies) {
        res.status(200).send(req.cookies)
    } else {
        res.send('User not authenticated', JSON.stringify(req.cookies))
    }
})

module.exports = router
