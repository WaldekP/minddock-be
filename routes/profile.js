const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    console.log('cookies', req.cookies)
    if (req.session.isLoggedIn) {
        res.status(200).send(req.session.psychologist)
    } else {
        res.send('User not authenticated', JSON.stringify(req.cookies))
    }
})

module.exports = router
