const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/logout', authController.postLogout)
router.get('/', authController.getAuth)
router.post('/', authController.postLogin)

module.exports = router
