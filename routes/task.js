const TaskController = require('../controllers/taskController')
const Auth = require('../middlewares/auth')
const router = require('express').Router()

router.post('/', TaskController.create)
router.get('/', TaskController.findAll)
router.use('/:id', Auth.authorization)
router.get('/:id', TaskController.findByPk)
router.put('/:id', TaskController.update)
router.patch('/:id', TaskController.updateCategory)
router.delete('/:id', TaskController.delete)

module.exports = router