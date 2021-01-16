const UserController = require('./userController')
const AppController = require('./appController')

class Controller {
  static getRootHandler(req, res) {
    res.send('Hi there! this is Kanban App server')
  }
}

module.exports = {
  Controller,
  UserController,
  AppController
}