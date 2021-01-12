const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const { errorHandlers } = require('../middlewares/errorHandlers')
const auth = require('./auth')
const task = require('./task')

// chek connection
router.get('/', (req, res) => {
    res.send('Welcome to Kanban Server!')
})

router.use(auth)
router.use(authentication)
router.use('/tasks', task)

router.use(errorHandlers)

module.exports = router