const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const category = require('./category')

router.use('/', user)
router.use('/categories', category)
router.use('/tasks', task)



module.exports = router