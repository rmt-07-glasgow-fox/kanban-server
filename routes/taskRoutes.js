const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorization } = require('../middlewares/auth')

router.post('/', TaskController.addTask)
router.get('/', TaskController.getAllTasks)
router.get('/:id', authorization, TaskController.getTaskById)
router.put('/:id', authorization, TaskController.updateTaskById)
router.patch('/:id', authorization, TaskController.patchTaskCategoryById)
router.delete('/:id', authorization, TaskController.deleteTaskById)

module.exports = router