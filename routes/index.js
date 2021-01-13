const router = require('express').Router()
const Controller = require('../controllers')
const authRouter = require('./auth.js')
const taskRouter = require('./task.js')
const categoryRouter = require('./category.js')
const { authenticate } = require('../middlewares/auth.js')

router.get('/', Controller.welcome)
router.use(authRouter)

router.use(authenticate)
router.use('/categories', categoryRouter)
router.use('/tasks', taskRouter)

module.exports = router