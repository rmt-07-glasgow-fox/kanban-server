const router = require('express').Router()
const { authorize } = require('../middlewares/auth')
const taskController = require('../controllers/taskController')

router.get('/tasks', taskController.showTask)
router.post('/tasks', taskController.addTask)
router.get('/tasks/:id', taskController.editTask)
router.put('/tasks/:id', taskController.updateTask)
router.patch('/tasks/:id', taskController.moveCategory)
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router