const {User} = require("../models")
const {compareHash} = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")
var CLIENT_ID = process.env.CLIENT_ID

class UserController {

  static register(req, res, next) {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(data => {
      return res.status(201).json({id: data.id, firstName: data.firstName, lastName: data.lastName, email: data.email})
    })
    .catch(err => {
      next(err)
    })
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({where : {email}})

      if (!user) {
        next({name: `UnauthorizeLogin`})
      }

      const matchPassword = compareHash(password, user.password)
      if (matchPassword) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email
        }

        const access_token = generateToken(payload)
        return res.status(200).json({access_token})
      } else {
        next({name: `UnauthorizeLogin`})
      }
    } catch (err) {
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { id_token } = req.body
      const client = new OAuth2Client(CLIENT_ID)
      const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: CLIENT_ID
      });
      const payload = ticket.getPayload()
      const email = payload.email
      let password = "logingooglepass212"
      let user = await User.findOne({ where: { email } })
      if (!user) {
          let newUser = { firstName, lastName, email, password }
          let createUser = await User.create(newUser)
          const payload = {
            id: createUser.id,
            email: createUser.email
          }
          const access_token = generateToken(payload)
          return res.status(201).json({ access_token })
      }
      if (user) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email
        }
        const access_token = createToken(payload)
        return res.status(200).json({ access_token })
      }
    } catch (err) {
        next(err)
    }
  }
}

module.exports = UserController