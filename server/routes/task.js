const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorize } = require('../middlewares/auth')

router.get('/', TaskController.getAllTask)
router.post('/', TaskController.createTask)

router.get('/:id', authorize, TaskController.getTaskById)
router.put('/:id', authorize, TaskController.editTask)
router.patch('/:id', authorize, TaskController.updateTask)

module.exports = router