const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const task = require('./task')
const category = require('./category')
const { authenticate } = require('../middlewares/auth')


router.use(authRouter)
router.use(authenticate)
router.use('/category', category)
router.use('/tasks', task)




module.exports = router; 