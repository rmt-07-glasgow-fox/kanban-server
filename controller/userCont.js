const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID

class Controller {

  static register (req, res, next) {
    let { email, username, password } = req.body
    User.create({ email, username, password })
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login (req, res, next) {
    let { email, password } = req.body
    User.findOne({where: {email: email}})
    .then(user => {
      if (user) {
        let result = comparePassword(password, user.password)
        if (result) {
          let payload = {
            id: user.id,
            email: user.email
          }
          let access_token = generateToken(payload)
          req.headers.access_token = access_token
          res.status(200).json({access_token: access_token, username: user.username})
        } else {
          throw ({message: 'Wrong username/password'})
        }
      } else {
        throw {name: '404'}
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static gLogin (req, res, next) {
    let { id_token } = req.body
    let email
    let username
    let client = new OAuth2Client(CLIENT_ID)

    client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      username = payload.name
      return User.findOne({where: {email: email}})
    })
    .then(user => {
      if (user) {
        return user
      } else {
        let password = ''
        return User.create({email, username, password})
      }
    })
    .then(user => {
      let payload = {
        id: user.id,
        email: user.email
      }
      let access_token = generateToken(payload)
      req.headers.access_token = access_token
      res.status(200).json({access_token: access_token, username: user.username})
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = Controller;