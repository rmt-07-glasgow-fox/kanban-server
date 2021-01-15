const AuthContoller = require('../controllers/authController')

const router = require('express').Router()

router.post('/login', AuthContoller.login)
router.post('/register', AuthContoller.register)
router.post('/loginGoogle', AuthContoller.loginGoogle)

module.exports = router