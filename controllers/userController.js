const { User } = require('../models/')
const { createToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body

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
}

module.exports = UserController
