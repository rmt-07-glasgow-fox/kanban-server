const router = require('express').Router()
const auth = require('./auth')
const task = require('./task')

// chek connection
router.get('/', (req, res) => {
    res.send('Welcome to Kanban Server!')
})

router.use(auth)
router.use('/tasks', task)

module.exports = router