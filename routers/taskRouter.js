const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authorize } = require('../middlewares/auth')

router.post('/', TaskController.postTask)
router.get('/', TaskController.getTask)
router.get('/:id', TaskController.getTaskById)


router.put('/:id', authorize, TaskController.putTaskById)
router.patch('/:id', authorize, TaskController.patchTaskById)
router.delete('/:id', authorize, TaskController.deleteTaskById)

module.exports = router