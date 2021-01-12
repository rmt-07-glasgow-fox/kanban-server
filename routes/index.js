const router = require('express').Router()
const authRouter = require('./auth.js')
const { authenticate } = require('../middlewares/auth.js')

router.get(authRouter)

router.use(authenticate)

module.exports = router