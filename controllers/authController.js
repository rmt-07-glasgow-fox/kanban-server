const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class authController {
  static login(req, res, next) {
    const { email, password } = req.body
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
        res.status(200).json({ access_token, username: data.username })
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
  static googleLogin(req, res, next) {
    const { id_token } = req.body
    let email = null
    let username = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email
      username = payload.name
      return User.findOne({
        where: { email }
      })
    })
    .then(user => {
      if(!user) {
        return User.create({
          username,
          email,
          password: Math.random()*1000+'google'
        })
      } else {
        return user
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      const access_token = generateToken(payload)
      res.status(200).json({
        access_token, username: user.username
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = authController