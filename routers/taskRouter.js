const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorize } = require('../middlewares/auth')

router.get('/', TaskController.UserTask)
router.post('/', TaskController.AddTask)
router.delete('/:idTask', authorize, TaskController.DeleteTask)
router.put('/:idTask/:CategoryId', authorize, TaskController.EditTask)
router.patch('/:idTask/:CategoryId', authorize, TaskController.UpdateCategoryTask)

module.exports = router