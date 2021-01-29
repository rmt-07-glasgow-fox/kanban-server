const router = require('express').Router()

const taskController = require('../controllers/task')
const { authorize } = require('../middlewares/auth')

router.post('/', taskController.createTask)
router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTaskById)
router.put('/:id', authorize, taskController.putTaskById)
router.patch('/:id', authorize, taskController.updateTaskStatus)
router.delete('/:id', authorize, taskController.deleteTaskById)

module.exports = router
