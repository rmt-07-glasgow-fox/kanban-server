const router  = require('express').Router()
const taskRouter = require('./task')
const userRouter = require('./user')

router.use('/tasks',taskRouter)
router.use(userRouter)


module.exports = router