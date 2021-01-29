const { User, Task } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register(req, res) {
        const { username, email, password } = req.body
        let obj = {
            username,
            email,
            password
        }
        
        User.create(obj)
        .then(data => {
            let obj = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(obj)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({ message: 'Invalid Email / Password'})
            }
            const isValidPass = comparePass(password, user.password)
            if (!isValidPass) {
                console.log('masuk inva')
                next({ message: 'Invalid Email / Password'})
            } else {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            }

        } catch (err) {
            console.log(err)
        }
    }

    static googleLogin(req, res, next){
        console.log('google login masuk')
        const { id_token } = req.body
        let email
        const client = new OAuth2Client('826425000447-gt39is72tfoncrialeoedku6p3khjc93.apps.googleusercontent.com');
        client.verifyIdToken({
          idToken: id_token,
          audience: 'client id google'
        })
          .then(data => {
            const payload = data.getPayload()
            email = payload.email
            return User.findOne({
              where:{
                email
              }
            })
          })  
          .then(user => {
            if (!user) {
              return User.create({
                email,
                password: (Math.random()*1000000).toString()
              })
            } else {
              return user
            }
          })
          .then(data => {
            let access_token = generateToken({
              id: data.id,
              email: data.email
            })
            res.status(200).json({
              access_token,
              data
            })
          })
          .catch(err => {
            next(err)
          })
      }
}

module.exports = { UserController }