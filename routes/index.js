const router = require('express').Router()
const ControllerUser = require('../controllers/userController')
const ControllerTask = require('../controllers/taskController')
const authentication = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/loginGoogle', ControllerUser.loginGoogle)

router.use(authentication)

router.get('/tasks', ControllerTask.showAll)
router.post('/tasks', ControllerTask.create)

router.get('/tasks/:id', authorize, ControllerTask.showByID)
router.put('/tasks/:id', authorize, ControllerTask.update)
router.patch('/tasks/:id', authorize, ControllerTask.changeCategory)
router.delete('/tasks/:id', authorize, ControllerTask.delete)

module.exports = router
