const router = require('express').Router();
const tasksRoutes = require('./tasksRoutes.js')
const userRoutes = require('./userRoutes.js')


router.use('/tasks', tasksRoutes)
router.use('/user', userRoutes)

module.exports = router