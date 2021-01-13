const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorize } = require('../middlewares/auth')

// only requires authentication
router.get('/', TaskController.getAllTasks)

router.get('/:id', TaskController.getTaskDescription)

router.post('/', TaskController.postTask)

// requires authorisation
router.use(authorize)

router.put('/:id', TaskController.editTask)

router.patch('/:id', TaskController.changeCategory)

router.delete('/:id', TaskController.deleteTask)

module.exports = router
