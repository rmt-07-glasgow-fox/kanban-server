const router = require("express").Router()
const userRouter = require("./userRouter")
const taskRouter = require("./taskRouter")
const {
  authentication
} = require("../middlewares/middleware")


router.use(userRouter)
router.use(authentication)
router.use(taskRouter)

module.exports = router