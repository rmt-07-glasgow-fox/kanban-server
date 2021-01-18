const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorize } = require('../middlewares/auth')

// only requires authentication
router.get('/', TaskController.getAllTasks)

router.get('/:id', TaskController.getTaskDescription)

router.post('/', TaskController.postTask)

// requires authorisation

router.put('/:id', authorize, TaskController.editTask)

router.patch('/:id', authorize, TaskController.changeCategory)

router.delete('/:id', authorize, TaskController.deleteTask)

module.exports = router
