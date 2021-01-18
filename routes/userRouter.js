const router = require('express').Router()
const UserController = require('../controllers/userController')


router.post('/register', UserController.registerHandler)
router.post('/login', UserController.loginHandler)
router.post('/googleLogin', UserController.loginGoogleHandler)


module.exports = router