const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const tasksController = require('../controllers/tasksController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', tasksController.createTasks)
router.get('/', tasksController.showTasks)
router.get('/:id', tasksController.showTasksById)

router.patch('/:id', authorization, tasksController.patchTasksById)
router.put('/:id', authorization, tasksController.putTasksById)
router.delete('/:id', authorization, tasksController.deleteTasksById)


module.exports = router 