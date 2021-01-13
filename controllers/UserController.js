const { User } = require('../models')
const compare = require('../helpers/bcryptHelper').compare
const generateToken = require('../helpers/jwtHelper').generateToken
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static userRegister(req, res, next){
    User.create({
      email: req.body.email || '',
      password: req.body.password || '',
      first_name: req.body.first_name || '',
      last_name: req.body.last_name || ''
    })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static userLogin(req, res, next){
    const { email, password } = req.body
    User.findOne({
      where:{
        email
      }
    })
      .then(data => {
        if(!data){
          next({
            name: 'NoEmail'
          })
        }else{
          let comparedPassword = compare(password, data.password)
          if(comparedPassword){
            let access_token = generateToken({
              id: data.id,
              email
            })
            res.status(200).json({
              access_token,
              email
            })
          }else{
            next({
              name: 'WrongPassword'
            })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static userGoogleLogin(req, res, next){
    const { id_token } = req.body
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
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
        if(!user){
          return User.create({
            email,
            password: (Math.random()*1000+`${process.env.JWT_SECRET}`).toString()
          })
        }else{
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
          userData: {
            email: data.email
          }
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController