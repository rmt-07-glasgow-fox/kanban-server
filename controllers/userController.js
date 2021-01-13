const {User} = require("../models")
const {compareHash} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class Controller {
  static async register(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(data)
      res.status(201).json({id: user.id, email: user.email})
    } catch (error) {
      next(error)
    }
  }
  
  static async login(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({where: {email: data.email}})
      if (user) {
        if (compareHash(data.password, user.password)) {
          const access_token = generateToken({id: user.id, email: user.email})
          res.status(200).json({access_token})
        } else {
          throw {
            code: 400,
            message: 'Wrong Password'
          }
        }
      } else {
        throw {
          code: 400, 
          message: 'Email does not exist'
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
