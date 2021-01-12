const {User} = require("../models")
const {compareHash} = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")

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
        throw new Error({name: `Unauthorize`})
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
        throw new Error({name: `Unauthorize`})
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController