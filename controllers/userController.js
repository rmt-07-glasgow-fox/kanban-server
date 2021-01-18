const { User } = require('../models/')
const { createToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body

        console.log(email, password)

        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    next({ name: "AuthError" })
                }
                else {

                    const match = comparePassword(password, user.password)

                    if (match) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }

                        const access_token = createToken(payload)

                        return res.status(200).json({ access_token })
                    }
                    else {
                        next({ name: "AuthError" })
                    }
                }
            })
            .catch(err => {
                console.log(">>>>>>", err)
                next(err)
            })
    }

    static register(req, res, next) {
        const { email, password } = req.body

        User.create({
            email,
            password
        })
            .then(newUser => {
                const registerResp = {
                    id: newUser.id,
                    email: newUser.email
                }

                res.status(201).json({ registerResp })
            })
            .catch(err => {
                next(err)
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
                email = payload.email

                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email,
                        password: Math.random().toString().slice(0, 16)
                    })
                }
                else {
                    return user
                }
            })
            .then(user => {
                const payload = {
                    email: user.email,
                    id: user.id
                }

                const access_token = createToken(payload)

                res.status(200).json({
                    access_token
                })

            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController
