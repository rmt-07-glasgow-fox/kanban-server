const { User } = require('../models')
const { decrypt, generateToken } = require('../helpers')
const { OAuth2Client } = require('google-auth-library');

class UserController{
    static handleRegister(req, res, next){
        let value = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(value)
        .then(data => {
            let result = {
                id: data.id,
                email: data.email,
                username: data.username
            }
            res.status(201).json(result)
        })
        .catch(err => {
            if(err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next(err)
            }
        })
    }
    
    static handleLogin(req, res, next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(data => {
            if(data){
                if(decrypt(password, data.password)){
                    let access_token = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({
                        access_token,
                        username: data.username
                    })
                } else {
                    next({
                        status: 401,
                        message: "Invalid email/password"
                    })
                }
            } else {
                next({
                    status: 401,
                    message: "Email not found, please register first"
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin(req, res, next){
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email
        let username
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            console.log(payload);
            email = payload.email
            username = payload.name
            return User.findOne({
                where: {email}
            })
        })
        .then(data => {
            if(!data){
                return User.create({
                    email,
                    username,
                    password: Math.random()*100+'rahasia'
                })
            } else {
                return data
            }
        })
        .then(data => {
            let access_token = generateToken({
                id: data.id,
                username: data.username,
                email: data.email
            })
            res.status(200).json({
                access_token,
                username: data.username
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController