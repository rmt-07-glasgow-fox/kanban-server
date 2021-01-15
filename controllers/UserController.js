const { User } = require ('../models/index')
const { checkPassword } =  require ('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')
const { OAuth2Client } = require ('google-auth-library')

class UserController {
  static async register (req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.create ({
        email, 
        password
      })
      res.status (201).json ({ id: data.id, email: data.email })
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      let data = await User.findOne ({
        where: {
          email
        }
      })
      if (!data) {
        next ({name: 'Invalid email / password'})
      } else {
        let checked = checkPassword (password, data.password)
        if (!checked) {
          next ({name: 'Invalid email / password'})
        } else {
          const payload = {
            id: data.id,
            email: data.email
          }
          const access_token = generateToken (payload)
          res.status (200).json ({id: data.id, access_token})
        }
      }
    } catch (err) {
      next (err)
    }
  }

  static async googleSignIn (req, res, next) {
    try {
      const { id_token } = req.body

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload();
      const email = payload.email

      const user = await User.findOne ({
        where: {
          email
        }
      })
      console.log (email)
      if (!user) {
        let createdUser = await User.create ({
          email,
          password: Math.random ()*1000 + 'secret',
          location: 'Jakarta'
        })
      } else {
          const payload = {
            id: user.id,
            email: user.email,
          }
          console.log (user, 'usergoogle')

          const access_token = generateToken (payload) 

          res.status (200).json ({id: user.id, access_token})
      }
    } catch (err) {
      console.log (err, 'err signin google')
    }
  }
}

module.exports = UserController