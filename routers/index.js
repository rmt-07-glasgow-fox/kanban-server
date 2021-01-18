const router = require('express').Router()
const auth = require('./auth')
const {authenticate} = require('../middlewares/auth')
const task = require('./task')

router.use(auth)
router.use(authenticate)
router.use('/tasks', task)

module.exports = router