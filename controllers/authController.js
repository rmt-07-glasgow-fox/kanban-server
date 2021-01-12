const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class authController {
  static login(req, res, next) {
    const { email, password } = req.body
    console.log(email, password)
    User.findOne({
      where: { email }
    })
    .then(data => {
      if(!data) {
        next({ name: 'invalidEmailPassword'})
      }
      const match = checkPassword(password, data.password)
      if(match) {
        const payload = {
          id: data.id,
          username: data.username,
          email: data.email
        }
        const access_token = generateToken(payload)
        res.status(200).json({ access_token })
      } else {
        next({ name: 'invalidEmailPassword'})
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static register(req, res, next) {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
    .then(data => {
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email
      })
    })
    .catch(err => {
      next(err)
    })
  }
  static googleLogin(req, res, next) {}
}

module.exports = authController