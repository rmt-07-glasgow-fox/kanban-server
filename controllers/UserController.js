const { User } = require('../models')

class UserController {
  static userRegister(req, res, next){
    User.create({
      email: req.body.email || '',
      password: req.body.password || ''
    })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static userLogin(req, res, next){
    res.send(req.body)
  }
  static userGoogleLogin(req, res, next){
    res.send(req.body)
  }
}

module.exports = UserController