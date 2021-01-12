const { } = require('../models')
const { createToken } = require('../helpers/token')

class UserController {
    static async register(req, res, next) {
        try {
            return res.status(200).json(req.body)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    static async login(req, res, next) {
        try {
            console.log(req.body)
            let { email, password } = req.body

            let convertToken = {
                id: 'test',
                email: email
            }
            let token = createToken(convertToken)
            console.log(token)

            return res.status(200).json({ access_token: token })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = UserController