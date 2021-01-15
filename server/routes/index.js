const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const category = require('./category')
const { authenticate } = require('../middlewares/auth')

router.use(user)

router.use(authenticate)

router.use(task)

router.use(category)


module.exports = router