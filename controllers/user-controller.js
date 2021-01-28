const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { tokenGenerate } = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');


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
                        if(err.name === 'SequelizeValidationError') next('SequelizeValidationError')
                        next(err)
                        // res.send(err)
                  })

      }

      static login(req, res, next) {
            let userLogin = {
                  email: req.body.email,
                  password: req.body.password 
            }
            
            User.findOne({where: {email: userLogin.email}})
                  .then(user => {
                        if(!user) res.status(404).json({message: 'invalid email/password'})
                        let match = comparePassword(userLogin.password, user.password)
                        if(!match) res.status(404).json({message: 'invalid email/password'})
                  
                        let payload = {
                              id: user.id,
                              email: user.email
                        }
                        let access_token = tokenGenerate(payload)
                   
                        res.status(200).json({access_token})
                  }).catch(err => {
                        if(err.name === 'SequelizeValidationError') next('SequelizeValidationError')
                        next(err)
                  })
            
      }

      static googleLogin(req, res, next) {
            const {id_token} = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID );
            let payload

            client.verifyIdToken({
                  idToken: id_token,
                  audience: process.env.GOOGLE_CLIENT_ID  
              }).then(ticket => {
                  payload = ticket.getPayload();
                  return User.findOne({where: {email: payload.email}})
              }).then(data => {
                    if(data){
                        return data
                    } else{ 
                        let password = toString(Math.floor(Math.random()*1000000))
                        return User.create({email: payload.email, password})
                    }
              }).then(data => {
                  const payLoad = { id: data.id, email: data.email }
                  const access_token = tokenGenerate(payLoad)
                  return res.status(200).json({ access_token })
                    
              }).catch(err => { next(err) })
              
              // If request specified a G Suite domain:
              // const domain = payload['hd'];
      }
}

module.exports = UserController