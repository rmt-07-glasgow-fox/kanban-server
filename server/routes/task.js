const router = require('express').Router()
const ControllerTask = require('../controllers/task')
const { authorize } = require('../middlewares/auth')

router.get('/', ControllerTask.readTask)
router.post('/', ControllerTask.createTask)
router.put('/:id', authorize, ControllerTask.putTask)
router.patch('/:id', authorize, ControllerTask.patchTask)
router.patch('/addMembers/:id', authorize, ControllerTask.addMembers)
router.delete('/:id', authorize, ControllerTask.deleteTask)

module.exports = router

