const { TaskController } = require('../controllers/task_controller')
const { authorization } = require('../middlewares/auth')

const router = require('express').Router()

router.post('/', TaskController.create)

router.get('/', TaskController.findAll)
router.get('/:id', authorization, TaskController.findOne)

router.put('/:id', authorization, TaskController.update)
router.patch('/:id', authorization, TaskController.setStatus)

router.delete('/:id', authorization, TaskController.delete)

module.exports = router

