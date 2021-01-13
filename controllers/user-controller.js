const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { tokenGenerate } = require('../helper/jwt')

class UserController {
      static register(req, res, next) {
            let newUser = {
                  email: req.body.email,
                  password: req.body.password
            } 

            User.create(newUser)
                  .then(data => {
                        res.status(201).json(data)
                  }).catch(err => {
                        res.status(400).json(err)
                  })

      }

      static login(req, res, next) {
            let userLogin = {
                  email: req.body.email,
                  password: req.body.password 
            }
            
            User.findOne({where: {email: userLogin.email}})
                  .then(user => {
                        if(!user) res.status(400).json(err)
                        let match = comparePassword(userLogin.password, user.password)
                        if(!match) res.status(400).json(err)
                  
                        let payload = {
                              id: user.id,
                              email: user.email
                        }
                        let access_token = tokenGenerate(payload)
                   
                        res.status(200).json({access_token})
                  }).catch(err => {
                        res.status(500).json(err)
                  })
            
      }

      static googleLogin(req, res, next) {
            
      }
}

module.exports = UserController