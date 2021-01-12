const router = require('express').Router()
const routerTask = require('./task')
const routerUser = require('./user')

router.use(routerUser)
router.use('/tasks', routerTask)

module.exports = router