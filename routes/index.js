const router = require("express").Router()

const userRoute = require("./userRoute")
const taskRoute = require("./taskRoute")
const categoryRoute = require("./categoryRoute")

router.use('/api/users',userRoute)
router.use('/api/tasks', taskRoute)
router.use('/api/categories', categoryRoute)

module.exports = router