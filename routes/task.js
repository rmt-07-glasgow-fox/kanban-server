const router = require('express').Router()
const TaskController = require('../controllers/controllerTask')
const { authorize } = require('../middlewares/auth.js')

router.get('/', TaskController.getTasks)
router.post('/', TaskController.createTask)

router.use('/:id', authorize)
router.get('/:id', TaskController.getTask)
router.put('/:id', TaskController.editTask)
router.patch('/:id', TaskController.patchTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = router