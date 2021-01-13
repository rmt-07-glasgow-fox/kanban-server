const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const {authentication} = require('../middlewares/auth')

router.use('/', userRouter)
router.use(authentication)
router.use('/', taskRouter)


module.exports= router