const router = require('express').Router()
const taskController = require('../controller/taskController')
const { authorization } = require('../middlewares/auth')

router.get('/task',  taskController.getAll)
router.post('/task',  taskController.create)
router.get('/task/:id', authorization, taskController.searchOne)
router.put('/task/:id', authorization, taskController.update)
router.patch('/task/:id', authorization, taskController.updateCategory)
router.delete('/task/:id', authorization, taskController.delete)

module.exports = router