const router = require('express').Router()
const userRouter = require('./userRouter')
const appRouter = require('./appRouter')
const { Controller } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.get('/', Controller.getRootHandler)
router.use(userRouter)
router.use(authentication)
router.use('/lorem', appRouter)

module.exports = router;