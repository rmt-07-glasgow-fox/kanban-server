const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {genToken} = require('../helpers/jwt')

class Controller {
    static register(req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname
        }
        //console.log(obj)
        User.create(obj)
        .then(data =>{
            //console.log(data)
            return res.status(201).json({
                id: data.id,
                email: data.email,
                fullname: data.fullname
            })
        })
        .catch(err =>{
            next(err)
        })
    }

    static login (req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj)
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                next({name: `accessDenied`})
            }else {
                let match = compare(obj.password, data.password)
                if(match){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let access_token = genToken(payload)
                    return res.status(200).json({
                        access_token
                    })
                }else {
                    next({name: `accessDenied`})
                }
            }
        })
        .catch(err =>{
            //console.log(err)
            next(err)
        })
    }

    static googleLogin(req, res, next){
        let {id_token} = req.body
        const client = new OAuth2Client(process.env.Google_API)
        let payload = null

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.Google_API
        })
        .then(ticket =>{
            payload = ticket.getPayload()
            return User.findOne({where: {email: payload.email}})
        })
        .then(user =>{
            //console.log(user)
            if(!user){
                //console.log(`masukkk====>`)
                return User.create({
                    email: payload.email,
                    fullname: payload.name,
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
            let access_token = genToken(googleSign)
            return res.status(200).json({
                access_token
            })
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = Controller