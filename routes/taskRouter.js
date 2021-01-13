const router = require('express').Router()
const TaskController = require('../controllers/taskController')

router.get('/', TaskController.getAllTasks)

router.get('/:id', TaskController.getTaskDescription)

router.post('/', TaskController.postTask)

router.put('/:id', TaskController.editTask)

router.patch('/:id', TaskController.changeCategory)

router.delete('/:id', TaskController.deleteTask)

module.exports = router
