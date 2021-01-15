const router = require('express').Router()
const taskController = require('../controllers/taskController')
const task = require('../models/task')
const { authorization } = require('../middlewares/authentification')

router.get('/task', taskController.getTask)
router.post('/task', taskController.addTask)
router.get('/task/:id', taskController.getOneTask)
router.put('/task/:id', taskController.editOneTask)
router.patch('/task/:id', authorization, taskController.editTask)
router.delete('/task/:id', authorization, taskController.deleteTask)

module.exports = router