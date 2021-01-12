const router = require("express").Router()
const taskRouter = require("../routes/taskRouter.js")
const userRouter = require("./userRouter.js")
const isLogin = require("../middlewares/authentication.js")


router.use(userRouter)
router.use(isLogin)
router.use('/task', taskRouter)


module.exports = router