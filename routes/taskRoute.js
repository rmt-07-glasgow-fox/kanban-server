const express = require('express')
const router = express.Router()

const {TaskController} = require('../controllers/taskController')
const {authorize} = require('../middlewares/auth')

router.get('/tasks/category/:categoryId',TaskController.list)
router.post('/tasks',TaskController.create)
router.put('/tasks/:id',authorize,TaskController.update)
router.patch('/tasks/:id/category/:categoryId',authorize,TaskController.changeCategory)
router.delete('/tasks/:id',authorize,TaskController.deleteTask)

module.exports = router