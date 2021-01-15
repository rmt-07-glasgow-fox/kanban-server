const UserController = require('../controllers/usercontroller')

const router  = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post("/googleLogin", UserController.googleLogin);



module.exports = router