const router = require('express').Router()
const taskController = require('../controller/taskController')
const { authorization } = require('../middlewares/auth')

router.get('/task', authorization, taskController.getAll)
router.post('task', authorization, taskController.create)


module.exports = router