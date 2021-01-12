const express = require('express')
const router = express.Router()
const user = require('./user')
const task = require('./task')
const { authenticate } = require('../middleware/auth')

router.use('/users', user)
router.use(authenticate)
router.use('/tasks', task)

module.exports = router;