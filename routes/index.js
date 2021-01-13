const router = require("express").Router()

const userRoute = require("./userRoute")
const taskRoute = require("./taskRoute")

router.use('/api/users',userRoute)
router.use('/api/tasks', taskRoute)

module.exports = router