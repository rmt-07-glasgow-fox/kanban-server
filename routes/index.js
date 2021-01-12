const router = require('express').Router()

const { authenticate } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')
const authRouter = require('./auth')
const taskRouter = require('./task')

router.use('/', authRouter)
router.use(authenticate)
router.use('/tasks', taskRouter)

router.use(errorHandler)

module.exports = router