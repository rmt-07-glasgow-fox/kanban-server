const router = require('express').Router()
const ControllerUser = require('../controllers/user')

router.post('/signup', ControllerUser.signup)
router.post('/signin', ControllerUser.signin)
router.post('/google', ControllerUser.loginGoogle)

module.exports = router

