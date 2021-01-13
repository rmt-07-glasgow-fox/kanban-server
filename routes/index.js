const router = require('express').Router()
const taskRouter = require("./task")
const authRouter = require("./auth")
const {authenticate} = require("../middlewares/auth")

router.get('/', (req,res) => {
  res.send("Hello!")
})

router.use(authRouter)
router.use(authenticate)
router.use(`/tasks`, taskRouter)

module.exports = router