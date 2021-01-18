const router = require('express').Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const taskRouter = require('./taskRouter')
const { authentication } = require('../middlewares/auth')


router.use(userRouter)
router.use(authentication)
router.use('/categories', categoryRouter)
router.use('/tasks', taskRouter)


module.exports = router