const route = require('express').Router()
const taskRoute = require('./task')
const userRoute = require('./user')
const { MainController } = require('../controllers')
const authentication = require('../middlewares/authentication')

route.get('/', MainController.home)
route.use(userRoute)

route.use(authentication)
route.use(taskRoute)

module.exports = route