const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

router.post('/', TaskController.postTask)
router.get('/', TaskController.getTask)
router.get('/:id', TaskController.getTaskById)
router.put('/:id', TaskController.putTaskById)
router.patch('/:id', TaskController.patchTaskById)
router.delete('/:id', TaskController.deleteTaskById)

module.exports = router