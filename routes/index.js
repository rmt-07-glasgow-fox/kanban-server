const router = require('express').Router()
const router_user = require('./router_user')
const router_category = require('./category_router')
const router_task = require('./router_task')
const { authentication } = require('../middlewares/auth')

router.use('/', router_user)
router.use(authentication)
router.use('/categories', router_category)
router.use('/tasks', router_task)



module.exports = router