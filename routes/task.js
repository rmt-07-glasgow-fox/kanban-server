const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorize } = require('../middlewares/auth')

router.get('/', TaskController.getTaskList)
router.post('/', TaskController.createNewTask)
router.put('/:id', authorize, TaskController.updateTask)
router.patch('/:id', authorize, TaskController.patchTask)
router.delete('/:id', authorize, TaskController.deleteTask)

module.exports = router