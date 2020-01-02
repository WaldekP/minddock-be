const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    console.log('cookies', req.cookies)
    if (req.session.isLoggedIn) {
        res.status(200).send({
          psychologist: req.session.psychologist,
            cookie: req.cookies,
        })
    } else {
        res.status(401).send('User not authenticated')
    }
})

module.exports = router
