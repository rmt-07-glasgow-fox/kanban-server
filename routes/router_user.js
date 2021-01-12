const { UserController } = require('../controllers/user_controller')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google_login', UserController.googleLogin)

module.exports = router