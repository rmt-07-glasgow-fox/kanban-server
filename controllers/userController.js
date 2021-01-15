const {
  User
} = require("../models")
const {
  comparePass
} = require("../helpers/bcrypt")
const {
  generateToken
} = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    let { email, password, fullname } = req.body
    User.create({ email, password, fullname })
      .then(data => {
        let sendOut = {
          id: data.id,
          email: data.email,
          fullname: data.fullname
        }
        let access_token = generateToken(sendOut)
        res.status(200).json({
          access_token,
          email: data.email,
          fullname: data.fullname
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (!data) {
          return next({
            name: "WrongLogin"
          })
        }
        let checkPass = comparePass(password, data.password)
        if (!checkPass) {
          return next({
            name: "WrongLogin"
          })
        }
        let payload = {
          id: data.id,
          email: data.email
        }
        let access_token = generateToken(payload)
        res.status(200).json({
          access_token,
          email: data.email,
          fullname: data.fullname
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    const { id_token } = req.body
    let email
    let fullname

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email
        fullname = payload.name
        return User.findOne({
          where: {
            email
          }
        })
      })
      .then(user => {
        if (!user) {
          return User.create({
            email,
            password: Math.floor(Math.random() * 999999) + "pass",
            fullname
          })
        } else {
          return user
        }
      })
      .then(user => {
        const payload = {
          id: user.id,
          email: user.email,
          fullname: user.fullname
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token,
          email: user.email,
          fullname: user.fullname
        })
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }

}

module.exports = UserController