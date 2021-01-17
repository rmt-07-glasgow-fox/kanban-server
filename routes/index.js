const router = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const { errorHandler } = require('../middlewares/errorHandler')
const authRoutes = require('../routes/auth')
const taskRoutes = require('../routes/task')

router.use('/', authRoutes)
router.use(authenticate)
router.use('/tasks', taskRoutes)
router.use(errorHandler)

module.exports = router