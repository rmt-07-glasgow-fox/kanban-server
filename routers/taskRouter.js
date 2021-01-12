const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { } = require('../middlewares/auth')

router.get('/', TaskController.UserTask)
router.post('/', TaskController.AddTask)
router.delete('/:idTask', TaskController.DeleteTask)
router.put('/:idTask/:CategoryId', TaskController.EditTask)
router.patch('/:idTask/:CategoryId', TaskController.UpdateCategoryTask)

module.exports = router