const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/task-controller')
const {authorize} = require('../middleware/auth')

router.post('/', TaskController.createTask)
router.get('/', TaskController.getTask)
router.get('/categories', TaskController.getCategory)
router.get('/:id', TaskController.getOne)
router.put('/:id', authorize, TaskController.updateTask)
router.delete('/:id', authorize, TaskController.deleteTask)

module.exports = router