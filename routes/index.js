const express = require('express')
const router = express.Router()
const task = require('./task-router')
const user = require('./user-router')
const {authenticate} = require('../middleware/auth')

router.use('/tasks', user)
router.use(authenticate)
router.use('/tasks', task)

module.exports = router