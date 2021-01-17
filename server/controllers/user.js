const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
    static async signup(req, res, next) {
        try {
            const { name, email, password } = req.body
            const user = await User.create({ name, email, password })
            const payload = {
                id: user.id,
                email: user.email
            }
            const access_token = await generateToken(payload)
            const registeredUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                access_token: access_token
            }
            return res.status(201).json(registeredUser)
        } catch (err) {
            next(err)
        }
    }

    static async signin(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                next({ name: "Invalid Email/Password" })
            }
            const checkPassword = comparePassword(password, user.password)
            if (checkPassword) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                let name = user.name
                return res.status(200).json({ access_token, name })
            } else {
                next({ name: "Invalid Email/Password" })
            }
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            let registeredUser = {}
            const { email, password, name } = req.body
            const user = await User.findOne({
                where: { email }
            })
            if (!user) {
                const newUser = await User.create({ name, email, password })
                registeredUser = {
                    id: newUser.id,
                    email: newUser.email
                }
            } else {
                registeredUser = {
                    id: user.id,
                    email: user.email
                }
            }
            const access_token = generateToken(registeredUser)
            return res.status(200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller