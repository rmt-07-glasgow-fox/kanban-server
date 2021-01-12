const router = require('express').Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')

router.use(userRouter)
router.use('/tasks', taskRouter)


module.exports = router