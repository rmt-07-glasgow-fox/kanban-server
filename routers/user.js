const routerUser = require('express').Router()
const UserController = require('../controllers/user')

routerUser.post('/register', UserController.register)
routerUser.post('/login', UserController.login)
routerUser.post('/google', UserController.google)

module.exports = routerUser