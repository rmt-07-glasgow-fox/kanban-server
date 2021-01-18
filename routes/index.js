const router = require('express').Router()
const taskRouter = require('./tasks')
const authRouter = require('./auth')
const { authentication } = require('../middlewares/auth')

router.use('/', authRouter)
router.use(authentication)
router.use('/tasks', taskRouter)

module.exports = router