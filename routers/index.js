var express = require('express')
var router = express.Router()
const usersController = require('../controllers/usersController')
const tasksRouter = require('../routers/tasksRouter')

// define the home page route
router.get('/', function (req, res) {
  res.send('<h1>Welcome buddy!</h1>')
})

// define the route
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/loginGoogle', usersController.loginGoogle)

// tasks router
router.use('/tasks', tasksRouter)

module.exports = router 