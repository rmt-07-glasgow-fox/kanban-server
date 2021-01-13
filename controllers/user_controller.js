const { comparePass } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      let user = await User.create(req.body)

      res.status(201).json(user)
    } catch(error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      let {email, password} = req.body
      let user = await User.findOne({where: {email}})

      if (!user) {
        next({name: 'invalidLogin'})
      } else {
        if (!comparePass(password, user.password)) {
          next({name: 'invalidLogin'})
        } else {
          // generate token
          const payload = {
            id: user.id,
            email: user.email,
            name: user.name
          }

          const access_token = generateToken(payload)
          let _user = {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
          }
          res.status(200).json({access_token, _user})
        }
      }

    } catch(error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let {id_token} = req.body
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      const payload = ticket.getPayload()
      let email = payload.email
      let name = payload.name

      let user = await User.findOne({where: {email}})
      if (!user) {
        user = await User.create({
          email,
          password: Math.random()*100+'uspassword',
          name
        })
      }

      const _payload = {
        id: user.id,
        email: user.email,
        name: user.name
      }

      const access_token = generateToken(_payload)
      let _user = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
      res.status(200).json({access_token, _user})
    } catch(error) {
      next(error)
    }
  }

}

module.exports = {UserController}