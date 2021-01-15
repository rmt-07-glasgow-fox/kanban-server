const router = require("express").Router()
const userController = require("../controllers/usersController")

router.post('/register', userController.regist)
router.post('/login', userController.login)
router.post('/google', userController.googleLogin)


module.exports = router