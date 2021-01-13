const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models')
const checkPassword = require('../helper/checkPassword')
const generateToken = require('../helper/generateToken')

class Controller{
/*=============================== Register =============================*/  
    static register(req, res, next){
        let body = req.body
        let data = {
            email: body.email,
            username: body.username,
            password: body.password
        }
        User.create(data)
        .then(data=>{
            res.status(201).json({message: 
                {   
                email:data.email, 
                username: data.username
                }
            })
        })
        .catch(err=>{
            next(err)
        })
    }

 /*=============================== LOGIN =============================*/   
    static login(req, res, next){
        let body = req.body
        let dataUser = {
            email: body.email,
            password: body.password
        }
        User.findOne({where:{email:dataUser.email}})
        .then(data=>{
            if(!data){
                next({name:'Email/Password incorrect'})
            }else{
                let macth = checkPassword(dataUser.password, data.password)
                if(!macth){
                    next({name:'Email/Password incorrect'})
                }else{
                    let payload = {id: data.id, email: data.email, username: data.username}
                    let access_token = generateToken(payload)
                    res.status(200).json(
                    {
                        id:  data.id, 
                        email: data.email, 
                        username: data.username, 
                        access_token
                    
                    })
                }
            }
        })
        .catch(err=>{
            console.log(err, 'eror disini')
            next(err)
        })

    }
/*=============================== LOGIN GOOGLE =============================*/   
    static logInGoogle(req, res, next){
        let email = null
        let username = null
        let id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            let payload = ticket.getPayload()
            email = payload.email
            username = payload.given_name
            return User.findOne({where:{email}})
        })
        .then(data=>{
            if(!data){
                return User.Create({
                    email,
                    username,
                    password: "12345678"
                })
            }else{
                return data
            }
        })
        .then(data=>{
            let payload = {
                id: data.id, 
                email: data.email, 
                username: data.username, 
                access_token
            }
            let access_token = generateToken(payload)
            return res.status(200).json({
                payload,
                access_token
            })
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = Controller