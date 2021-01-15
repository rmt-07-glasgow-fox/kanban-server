const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { Op } = require("sequelize")
const { comparepassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(user)
            .then(data => {
                const sent = {
                    id: data.id,
                    email: data.email,
                    username: data.username
                }

                res.status(201).json(sent)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller user: register user'
                })
            })
    }

    static login(req, res, next) {
        const { validator, password } = req.body

        User.findOne({
            where: {
                [Op.or]: [
                    { email: validator },
                    { username: validator }
                ]
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

                const isValid = comparepassword(password, data.password)
                if (isValid) {
                    // kirim jwt
                    const payload = {
                        id: data.id,
                        email: data.email
                    }

                    const access_token = generateToken(payload)
                    res.status(200).json({ access_token })
                } else {
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 400,
                    from: 'Controller User: login user'
                })
            })
    }

    static loginGoogle(req, res, next) {
        const { id_token } = req.body
        let email = null

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                console.log(payload);
                email = payload.email

                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email,
                        username: 'username',
                        password: Math.random() * 100 + 'password random google'
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
                const access_token = generateToken(payload)

                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    access_token: access_token
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller