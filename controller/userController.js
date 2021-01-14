const { comparePassword } = require('../helpers/brcypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

class UserController {
  static async register(req,res,next){
    try {
      const { email, password } = req.body
      const user = await User.create({
        email: email || '',
        password: password ||''
      })
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req,res,next){
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email: email || '' }
      })
      if(user){
        const match = comparePassword(password ? password : '', user.password)
        if(match){
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          res.status(200).json({
            id: user.id,
            email: user.email, 
            access_token
          })
        } else {
          next({name: `ErrorLogin`})
        }
      } else {
        next({name: `ErrorLogin`})
      }
    } catch (err) {
      next(err)
    }
  }

  static async loginGoogle(req,res,next){
    const { id_token } = req.body

    const client = new OAuth2Client(process.env.GOOGLE_CLIEN_ID);
    try{
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIEN_ID,
      });
      const payload_google = ticket.getPayload();
      const email = payload_google.email

      const user = await User.findOne({where:{email}})
      if(!user){
        const user = await User.create({
            email : email,
            password : (Math.random()+3289189).toString()
        })
        const payload = {
          id:user.id,
          email:user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          email: user.email,
          access_token,
          user_name: payload_google.name
        })
      }else{
        const payload = {
          id:user.id,
          email:user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          email: user.email,
          access_token,
          user_name: payload_google.name
        })
      }
    }catch(err){
      next(err)
    }
  }
}

module.exports = UserController