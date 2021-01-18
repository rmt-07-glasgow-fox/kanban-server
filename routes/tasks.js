const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorization } = require('../middlewares/auth')

// authentication 
router.get('/', TaskController.showTasks)
router.post('/', TaskController.createTask)

// authorization 
router.get('/:id', authorization, TaskController.getTaskById)
router.put('/:id', authorization, TaskController.updateTask)
router.patch('/:id', authorization, TaskController.updateCategory)
router.delete('/:id', authorization, TaskController.destroyTask)

module.exports = router