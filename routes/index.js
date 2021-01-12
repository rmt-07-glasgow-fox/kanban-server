const router = require('express').Router()
const ControllerUser = require('../controllers/userController')
const ControllerTask = require('../controllers/taskController')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

router.get('/tasks', ControllerTask.showAll)

router.post('/tasks', ControllerTask.create)
router.put('/tasks/:id', ControllerTask.update)
router.patch('/tasks/:id', ControllerTask.changeCategory)
router.delete('/tasks/:id', ControllerTask.delete)

module.exports = router
