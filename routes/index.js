const express = require('express')
const router = express.Router()
const todoRouter = require('./task')
const userRouter = require('./user')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Hello World!')
})  

// router.get('/calendar', CalendarController.getCalendar)

router.use(userRouter)
router.use(authenticate)
router.use(todoRouter)

module.exports = router