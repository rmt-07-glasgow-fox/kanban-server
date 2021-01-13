const router = require('express').Router()
const { TaskController } = require('../controllers/task_controllers')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', TaskController.findTasks)
router.post('/', TaskController.createTask)
router.get('/:id', TaskController.findTaskById)
router.put('/:id', authorize, TaskController.editTask)
router.delete('/:id', authorize, TaskController.destroyTask)

module.exports = router