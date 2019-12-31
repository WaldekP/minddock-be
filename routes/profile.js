const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).send(req.session.psychologist)
    } else {
        res.status(404).send('User not authenticated')
    }
})

module.exports = router
