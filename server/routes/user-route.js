const Controller = require('../controllers/user-controller')
const route = require('express').Router()

// routing and endpoints
route.post('/register', Controller.register)
route.post('/login', Controller.login)
route.post('/loginGoogle', Controller.loginGoogle)

module.exports = route