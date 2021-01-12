const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const {authentication} = require('../middlewares/auth')

router.use('/', userRouter)
router.use(authentication)

module.exports= router