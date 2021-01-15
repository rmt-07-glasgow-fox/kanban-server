const router = require('express').Router()
const ControllerTask = require('../controllers/task')
const { authorize } = require('../middlewares/auth')

router.get('/', ControllerTask.readTask)
router.post('/', ControllerTask.createTask)
router.put('/:id', authorize, ControllerTask.putTask)
router.delete('/:id', authorize, ControllerTask.deleteTask)
router.get('/user', ControllerTask.userData)

module.exports = router

