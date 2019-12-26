const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    return res.send('Cos tam cos tam');
});
module.exports = router;
