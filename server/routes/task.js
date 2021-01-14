const TaskController = require('../controllers/taskController')
const router = require('express').Router()
const { authorize } = require('../middlewares/auth')

router.post('/', TaskController.addTask)
router.get('/', TaskController.getAllTasks)
router.put('/:id', authorize, TaskController.updateTask)
router.delete('/:id', authorize, TaskController.deleteById)

module.exports = router