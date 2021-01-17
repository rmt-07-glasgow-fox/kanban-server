const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { genToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
        .then(data => {
            res.status(201).json({id: data.id, email: data.email})
        })
        .catch(next)
    }
    
    static login(req, res, next) {
        let { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(user => {
            if (!user) {
                return next({name: 'Unauthorized', message: 'invalid email/password'})
            }
            if (comparePassword(password, user.password)) {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let access_token = genToken(payload)
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    access_token
                })
            } else {
                return next({name: 'Unauthorized', message: 'invalid email/password'})
            }
        })
        .catch(next)
    }

    static loginGoogle(req, res, next) {
        let { id_token } = req.body
        let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket => {
        const payload = ticket.getPayload();
        email = payload.email

        return User.findOne({
            where: {email}
        })
        })
        .then(user => {
            if(!user) {
                return User.create({
                    email,
                    password: Math.random()*1000+'ini random'
                })
            } else {
                return user
            }
        })
        .then(user => {
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = genToken(payload)
            return res.status(200).json({
                access_token
            })
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = UserController