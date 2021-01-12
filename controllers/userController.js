const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class ControllerUser {
  static register (req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(input)
      .then(user => {
        const output = {
          id: user.id,
          email: user.email
        }
        res.status(201).json(output)
      })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: input.email
      }
    })
      .then(user => {
        if (user) {
          const checkPass = checkPassword(input.password, user.password)
  
          if (checkPass) {
            const payload = {
              id: user.id,
              email: user.email
            }
  
            const access_token = generateToken(payload)
            req.headers.access_token = access_token
            res.status(200).json({ access_token })
          } else {
            res.status(401).json({
              message: 'Invalid email or password'
            })
          }
        } else {
          res.status(401).json({
            message: 'Invalid email or password'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerUser
