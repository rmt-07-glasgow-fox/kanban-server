const router = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const categoryRoutes = require('./categoryRoutes')
const { authentication } = require('../middlewares/auth')

router.use(userRoutes)
router.use(authentication)
router.use('/tasks', taskRoutes)
router.use('/categories', categoryRoutes)

module.exports = router