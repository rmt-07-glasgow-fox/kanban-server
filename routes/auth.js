const AuthContoller = require('../controllers/authController')

const router = require('express').Router()

router.post('/login', AuthContoller.login)
router.post('/register', AuthContoller.register)

module.exports = router