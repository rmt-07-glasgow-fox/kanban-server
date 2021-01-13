const router = require('express').Router()
const taskRouter = require('./taskRouter')
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.use('/tasks', taskRouter)


module.exports = router
