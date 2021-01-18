const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt.js')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    
    static registerHandler(req, res, next) {

        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static loginHandler(req, res, next) {

        const { email, password } = req.body
        console.log(req.body)

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                
                if(data && comparePassword(password, data.password)) {

                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    
                    const access_token = generateToken(payload)
            

                    res.status(200).json({
                        access_token
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogleHandler (req, res, next) {
        let { id_token } = req.body
        console.log(id_token)
        const client = new OAuth2Client('1026188642749-hq5segt5b8emvesnu54280ksjgh7visf.apps.googleusercontent.com')
        
        let payload = null
        //console.log(`masukkk====>`)
        client.verifyIdToken({
            idToken: id_token,
            audience: '1026188642749-hq5segt5b8emvesnu54280ksjgh7visf.apps.googleusercontent.com'
        })
        .then(ticket =>{
            //console.log(ticket)
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user =>{
            //console.log(user)
            if(!user){
                //console.log(`masukkk====>`)
                return User.create({
                    email: payload.email,
                    name: payload.name,
                    password: Math.floor(Math.random()*1000) + 'iniDariGoogle'
                })
            } else{
                return user
            }
        })
        .then(user =>{
            let googleSign = {
                id: user.id,
                email: user.email
            }
            let accessToken = generateToken(googleSign)
            return res.status(200).json({
                access_token: accessToken
            })
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })

    }

}

module.exports = UserController