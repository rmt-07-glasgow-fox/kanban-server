const router = require('express').Router()
const { UserController } = require('../controllers/user_controllers')
const taskRouter = require('./tasks_routes')
const { authenticate, authorize } = require('../middlewares/auth')

router.use('/register', UserController.register)
router.use('/login', UserController.login)
router.use('/googleLogin', UserController.googleLogin)
router.use(authenticate)
router.use('/tasks', taskRouter)

module.exports = router