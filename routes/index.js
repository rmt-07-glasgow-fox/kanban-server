const router = require('express').Router()
const authController = require('../controllers/authController')
const { authenticate } = require('../middlewares/auth')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/googleLogin', authController.googleLogin)

router.use(authenticate)

module.exports = router