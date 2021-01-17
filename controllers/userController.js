const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body
      const user = await User.create({
        email,
        password, 
        username 
      })
      const response = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      return res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username
        }
      })
      if(!user) {
        throw {name: 'invalidUserPassword'}
      }
      const match = comparePassword(password, user.password)
      if (match ) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token,
        })
      } else {
        throw {name: 'invalidUserPassword'}
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController