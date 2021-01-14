const router = require('express').Router()
const userRouter = require('./user')
const taskRouter = require('./task')
const { authenticate} = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to kanban home page'})
})

router.use(userRouter)
router.use(authenticate)
router.use('/tasks', taskRouter)

module.exports = router