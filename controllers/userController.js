const { User } = require('../models')
const { createToken } = require('../helpers/token')
const { isPasswordValid } = require('../helpers/password')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static async register(req, res, next) {
        try {
            let { email, password } = req.body

            let createUser = await User.create({ email, password })
            // console.log('>>> createUser : ',createUser)

            let response = {
                email: createUser.email
            }

            return res.status(201).json({ message: response })

        } catch (err) {
            return next(err)
        }
    }

    static async login(req, res, next) {
        try {
            // console.log(req.body)
            let { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({ message: 'Email / Password is empty' })
            }

            let user = await User.findOne({ where: { email: email } })

            if (!user) {
                return res.status(404).json({ message: "Email isn't registered" })
            }

            if (user) {

                if (!isPasswordValid(password, user.password)) {
                    return res.status(400).json({ message: 'Invalid Password' })
                }

                if (isPasswordValid(password, user.password)) {
                    let convertToken = {
                        id: user.id,
                        email: email
                    }

                    let token = createToken(convertToken)
                    console.log(token)

                    return res.status(200).json({ access_token: token })
                }

            }

            console.log('salah')

        } catch (err) {
            return next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            // console.log('>>> body.id_token : ', req.body.id_token)
            const { id_token } = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload()
            // console.log('>>> payload : ', payload)

            const email = payload.email
            let password = email.toString().split('@')
            password = password[0]
            console.log('>>> user : ', email, password)

            let user = await User.findOne({ where: { email } })
            // console.log('>>> user : ', user)

            if (!user) {
                let newUser = { email, password }

                let createUser = await User.create(newUser)
                const payload = {
                    id: createUser.id,
                    email: createUser.email
                }

                const access_token = generateToken(payload)
                console.log('>>> access_token', access_token)

                return res.status(201).json({ access_token })

            }

            if (user) {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                const access_token = generateToken(payload)
                console.log('>>> access_token', access_token)

                return res.status(200).json({ access_token })
            }

        } catch (err) {
            console.log(err)
            return next(err)
        }
    }
}

module.exports = UserController