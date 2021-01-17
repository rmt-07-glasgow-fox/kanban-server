const router = require('express').Router()
const userRouter = require('./user')
const {authenticate} = require('../middlewares/auth')
const taskRouter = require('./task')
const categoryRouter = require('./category')

router.use(userRouter)
router.use(authenticate)
router.use(taskRouter)
router.use(categoryRouter)

module.exports = router