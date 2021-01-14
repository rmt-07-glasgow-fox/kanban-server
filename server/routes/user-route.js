const Controller = require('../controllers/user-controller')
const route = require('express').Router()

// routing and endpoints
route.post('/register', Controller.register)
route.post('/login', Controller.login)

module.exports = route