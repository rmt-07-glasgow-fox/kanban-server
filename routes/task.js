const TaskController = require('../controllers/taskController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.post('/', TaskController.create)
router.get('/', TaskController.findAll)
router.get('/:id', Auth.authorization, TaskController.findByPk)
router.put('/:id', Auth.authorization, TaskController.update)
router.patch('/:id', Auth.authorization, TaskController.updateCategory)
router.delete('/:id', Auth.authorization, TaskController.delete)

module.exports = router