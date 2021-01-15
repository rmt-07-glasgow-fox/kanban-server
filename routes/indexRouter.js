const router = require ('express').Router()
const userRouter = require ('../routes/userRouter')
const taskRouter = require ('./taskRouter')
const categoryRouter = require ('./categoryRouter')
const { authenticate } = require ('../middlewares/auth')

router.use (userRouter)

router.use (authenticate)

router.use (categoryRouter)

router.use (taskRouter)

module.exports = router