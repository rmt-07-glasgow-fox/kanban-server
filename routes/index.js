const router = require("express").Router()

const userRoute = require("./userRoute")
const taskRoute = require("./taskRoute")

router.use(userRoute)
router.use(taskRoute)

module.exports = router