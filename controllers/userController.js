const {OAuth2Client} = require('google-auth-library')
const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class userController{
    static register(req, res, next) {
        const {email, password, organization} = req.body
        User.create({email, password, organization})
        .then(user => {
            const {id, email} = user
            res.status(201).json({id, email, organization})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                next({name: "Email/Password Invalid"})
            } else {
                let match = comparePassword(password, user.password)
                if (!match) {
                    next({name: "Email/Password Invalid"})
                } else {
                    const {id, email, organization} = user
                    const access_token = generateToken({id, email, organization})
                    res.status(200).json({access_token})
                }
            }
        })
        .catch(err => {
            next(err)
        })
        
    }

    static loginGoogle(req, res , next){
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_API)
        let payload = null
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_API
        })
        .then(ticket =>{
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user =>{
            if(!user){
                return User.create({
                    email: payload.email,
                    password: Math.floor(Math.random()*1000) + 'iniDariGoogle'
                })
            }else {
                return user
            }
        })
        .then(user =>{
            let googleSign = {
                id: user.id,
                email: user.email
            }
            let access_token = generateToken(googleSign)
            res.status(200).json({access_token})
        })
        .catch(err =>{
            next(err)
        })
    }

}

module.exports = userController