const { User } = require('../models')

class UserController {
  static register(req, res) {
    res.status(200).json({
      msg: "tes dari register controller"
    })
  }

  static login(req, res) {
    res.status(200).json({
      msg: 'tes dari login controller'
    })
  }
  
}

module.exports = UserController