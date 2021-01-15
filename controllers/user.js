const { OAuth2Client } = require('google-auth-library')

const { User } = require('../models')
const { checkHash } = require ('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')

const GOOGLE_CLIENT_ID =  process.env.GOOGLE_CLIENT_ID

class Controller {

  static registerUser(req, res, next) {
    let { fullName, email, password } = req.body
    let input = { fullName, email, password }

    User.create(input)
      .then( user => {
        res.status(201).json({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          accessToken: generateToken({ id: user.id, email: user.email })
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static loginUser(req, res, next) {
    let { email, password } = req.body

    User.findOne({
      where: {
        email
      }
    })
      .then( user => {
        if(user) {
          if(checkHash(password, user.password)) {
            res.status(200).json({
              fullName: user.fullName,
              accessToken: generateToken({ id: user.id, email: user.email })})
          } else {
            next({ name: 'Wrong Password' })
          }
        } else {
          next({ name: 'Wrong Email' })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static loginByGoogle(req, res, next) {
    let email
    let fullName
    let idToken = req.body.id_token
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)

    client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    })
      .then(ticket => {
        let payload = ticket.getPayload();
        email = payload.email
        fullName = payload.name
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(data => {
        if(!data) {
          return User.create({
            fullName,
            email,
            password: "12345678"
          })
        } else {
          return data
        }
      })
      .then(data => {
        let payload = {
          id: data.id,
          email: data.email
        }
        let accessToken = generateToken(payload)

        return res.status(200).json({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          accessToken
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller
