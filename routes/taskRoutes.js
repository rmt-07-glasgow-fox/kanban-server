const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorization } = require('../middlewares/auth')

router.post('/', TaskController.addTask)
router.get('/', TaskController.getAllTasks)
router.get('/:id', authorization, TaskController.getTaskById)

module.exports = router