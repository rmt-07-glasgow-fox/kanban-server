const express = require('express')
const router = express.Router()
const todoRouter = require('./task')
const userRouter = require('./user')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Hello World!')
})  

router.use(userRouter)
router.use(authenticate)
router.use(todoRouter)

module.exports = router