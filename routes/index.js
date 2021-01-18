const router = require('express').Router()

const { authenticate } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')
const authRouter = require('./auth')
const taskRouter = require('./task')
const categoryRouter = require('./category')

router.use('/', authRouter)
router.use(authenticate)
router.use('/tasks', taskRouter)
router.use('/categories', categoryRouter)

router.use(errorHandler)

module.exports = router