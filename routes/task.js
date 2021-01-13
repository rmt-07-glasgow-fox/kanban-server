const express = require('express')
const router = express.Router()
const {TaskController} = require('../controllers/TaskController')
const {authorize} =require('../middlewares/auth')

router.get('/tasks', TaskController.getTask)
router.post('/tasks', TaskController.addTask)
router.delete('/tasks/:id',authorize , TaskController.deleteTask)
router.put('/tasks/:id',authorize , TaskController.editTask)
router.patch('/tasks/:id', authorize, TaskController.editOne)

module.exports = router