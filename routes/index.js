const router = require('express').Router()
const taskRouter = require('./taskRouter')
const UserController = require('../controllers/userController')
const { authenticate } = require('../middlewares/auth')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/loginGoogle', UserController.loginGoogle)

router.use('/tasks', authenticate, taskRouter)

module.exports = router
