const router = require('express').Router()
const authRouter = require('./auth.js')
const taskRouter = require('./task.js')
const { authenticate } = require('../middlewares/auth')



router.use(authRouter)
// router.use(authenticate)
router.use('/tasks', taskRouter)


module.exports = router