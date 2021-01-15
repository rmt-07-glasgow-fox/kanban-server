const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');


class UserController {
    static register(req, res, next) {
        let input = {
            email: req.body.email, 
            password: req.body.password
        }
        User.create(input)
            .then(data => {
                let result = {
                    id: data.id,
                    email: data.email
                }
                res.status(201).json(result)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Invalid Input' })
                } else {
                    if (comparePassword(password, data.password)) {
                        //jwt
                        let payload = {
                            id: data.id,
                            email: data.email
                        }
                        let access_token = generateToken(payload)
                        res.status(200).json({ access_token })
                    } else {
                        next({ name: 'Invalid Input' })
                    }
                }
            })
            .catch(next)
    }

    static loginGoogle(req, res, next) {
        console.log('masuk login google controller')
        let id_token = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email 
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                // console.log(payload)
                email = payload.email
                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data) {
                    return data
                } else {
                    return User.create({
                        email, 
                        password: Math.random()*1000 + 'meongeongoen'
                    })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id, 
                    email: data.email
                }
                let access_token = generateToken(payload)
                res.status(200).json({ access_token })
            })
            .catch(next)
    }
}


module.exports = UserController