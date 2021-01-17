const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorizeTask, authorizeCategory } = require('../middlewares/auth')

router.get('/', TaskController.AllTask)
router.post('/', TaskController.AddTask)
router.delete('/:idTask', authorizeTask, TaskController.DeleteTask)
router.patch('/:idTask/:CategoryId', authorizeTask, authorizeCategory, TaskController.ChangeCategory)
router.put('/:idTask/:CategoryId', authorizeTask, authorizeCategory, TaskController.EditTask)

module.exports = router