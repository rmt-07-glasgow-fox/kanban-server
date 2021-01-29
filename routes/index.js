const router = require('express').Router()

const taskRouter = require('./task')
const userRouter = require('./user')
const { authenticate } = require('../middlewares/auth')

router.use('/', userRouter)
router.use('/tasks', authenticate)
router.use('/tasks', taskRouter)


module.exports = router
