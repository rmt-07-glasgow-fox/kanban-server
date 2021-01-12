const { User } = require('../models')
const { comparePwd } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    const { name, email, password } = req.body
    const newUser = { name, email, password }

    User.create(newUser)
      .then(user => {
        const registeredUser = {id: user.id, email: user.email}
        return res.status(201).json(registeredUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    
    User.findOne({ where: {email} })
      .then(user => {
        if (!user) {
          next({ name: 'InvalidPassOrEmail' })
        } else {
          const isMatched = comparePwd(password, user.password)
          if (!isMatched) {
            next({ name: 'InvalidPassOrEmail' })
          } else {
            const payload = { id: user.id, email: user.email }
            const access_token = generateToken(payload)
            res.status(200).json({ access_token })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController

