const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorization } = require('../middlewares/auth')

router.post('/', TaskController.postTaskHandler)
router.get('/', TaskController.getTaskHandler)
router.put('/:id', authorization, TaskController.putTaskHandler)
router.patch('/:id', authorization, TaskController.patchTaskHandler)
router.delete('/:id', authorization, TaskController.deleteTaskHandler)


module.exports = router