const TaskController = require('../controllers/taskController')
const router = require('express').Router()
const { authorize } = require('../middlewares/auth')

router.post('/', TaskController.addTask)
router.get('/', TaskController.getAllTasks)
router.get('/:id', authorize, TaskController.taskById)
router.put('/:id', authorize, TaskController.updateTask)
router.delete('/:id', authorize, TaskController.deleteById)

module.exports = router