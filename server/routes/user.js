const router = require('express').Router()
const ControllerUser = require('../controllers/user')

router.post('/signup', ControllerUser.signup)
router.post('/signin', ControllerUser.signin)

module.exports = router

