const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController{
    static async register(req, res, next){
        const payload = {
            email: req.body.email,
            password: req.body.password,
        }
        try {
            const user = await User.create(payload)
            console.log(user)
            res.status(201).json({id: user.id, email: user.email})
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const dataUser = await User.findOne({where: {email: req.body.email}})
            if(!dataUser){
                throw {
                    name: "UserNotFound",
                    status: 404,
                }
            }
            else if(comparePassword(req.body.password, dataUser.password)){
                const access_token = generateToken({id: dataUser.id, email: dataUser.email})
                res.status(200).json({access_token: access_token, id: dataUser.id})
            }
            else{
                throw{
                    name: "InvalidLogin",
                    status: 400
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static googleLogin (req, res, next) {
        let payload;
        console.log(req.body) 
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
          payload = ticket.getPayload()
            return User.findOne({ where: { email: payload.email }})
        })
        .then(user => {
          if (user) { 
                return user
            } else {
                return User.create({ email: payload.email, password: process.env.GOOGLE_USER_PWD })
            }
        })
        .then(user => {
            const access_token = generateToken({ email:user.email, id: user.id })
            res.status(200).json({access_token, user})
        })
        .catch(error => {
            
            console.log(error.message)
            console.log("masuk error bos")
            next(error)
        })
    }
    
}


module.exports = UserController