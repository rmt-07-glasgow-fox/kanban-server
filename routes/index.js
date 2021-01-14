const e = require('express')
const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const taskRoute = require('./taskRoute')
const categoryRoute = require('./categoryRoute')
const {authenticate} = require('../middlewares/auth')

router.use('/',userRoute)
router.use(authenticate)
router.use('/',taskRoute)
router.use('/',categoryRoute)

module.exports = router
