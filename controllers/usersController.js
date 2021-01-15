const { User, Task } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static register(req, res, next) {
    let { email, password } = req.body

    let input = { email, password }

    User.create(input, {
      returning: true
    })
    .then((data) => {
      return res.status(201).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static login(req, res, next) {
    let { email, password } = req.body

    User.findOne({
      where: {email:email},
    })
    .then((data) => {
      //if 404
      if (!data) {
        return res.status(404).json({message: "Email not found"})
      }

      //compare the password
      let isValid = checkPassword(password, data.password)
      if (!isValid) {
        return res.status(400).json({message: "Invalid password"})
      }

      //generate token
      let payload = { id: data.id, email: data.email }
      let token = generateToken(payload)
      return res.status(201).json({access_token: `${token}`})
    })
    .catch((err) => {
      next(err)
    })
  }

  static loginGoogle(req, res, next) {
    let email
    let id_token = req.body.id_token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then((user) => {
      //find the user, if the user doesnt exist, create a new one
      if (!user) {
        let input = {email: email, password: Math.ceil(Math.random()*1000000)+'rhs'}
        return User.create(input)
      } else {
        return user
      }
    })
    .then((user) => {
      //generate the jwt
      const payload = {
        id: user.id,
        email: user.email
      }
      let access_token =  generateToken(payload)
      return res.status(200).json({
        access_token
      })
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = Controller