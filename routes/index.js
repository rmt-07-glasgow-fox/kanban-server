const router = require('express').Router()
const userRouter = require('./user')
const taskRouter = require('./task')
const categoryRouter = require('./category')
const { authenticate} = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to kanban home page'})
})

router.use(userRouter)
router.use('/category', categoryRouter)
router.use(authenticate)
router.use('/tasks', taskRouter)

module.exports = router