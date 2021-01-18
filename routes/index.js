const router = require('express').Router()
const authRouter = require('./auth')
const taskRouter = require('./tasks')
const { authenticate } = require('../middlewares/auth')

router.use(authRouter)
router.use(authenticate)
router.use('/tasks', taskRouter)

module.exports = router