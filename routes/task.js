const router = require('express').Router()
const taskController = require('../controllers/taskController')
const { authorize } = require('../middlewares/auth')

router.post('/', taskController.createTask)
router.get('/', taskController.getTask)

router.get('/:id', authorize, taskController.getOneTask)
router.put('/:id', authorize, taskController.updateTask)
router.patch('/:id', authorize, taskController.modifyTask)
router.delete('/:id', authorize, taskController.deleteTask)

module.exports = router