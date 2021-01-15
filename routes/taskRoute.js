const express = require('express')
const router = express.Router()

const {TaskController} = require('../controllers/taskController')
const {authorize} = require('../middlewares/auth')

router.get('/task',TaskController.getAllTask)
router.post('/tasks',TaskController.create)
router.put('/tasks/:id',authorize,TaskController.update)
router.delete('/tasks/:id',authorize,TaskController.deleteTask)

module.exports = router