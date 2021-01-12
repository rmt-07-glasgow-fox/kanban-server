const { User } = require("../models")
const { compare } = require("../helpers/hashPassword.js")
const { makeToken } = require("../helpers/jwt.js")

class userController {

    static regist(req, res, next) {
        const { username, email, password } = req.body

        User.create({ username, email, password })
            .then(data => {
                res.status(201).json({ username: data.username, email: data.email })
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 400,
                    from: 'sign up'
                })
            })
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({
                    message: "invalid email / password",
                    code: 401,
                    from: 'sign in'
                })
            } else {
                const valid = compare(password, user.password)
                if (valid) {
                    const payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username
                    }

                    const access_token = makeToken(payload)
                    res.status(200).json({ access_token })
                } else {
                    next({
                        message: "invalid email / password",
                        code: 401,
                        from: 'sign in'
                    })
                }
            }
        } catch (err) {
            next({
                message: err.message,
                code: 400,
                from: 'sign in'
            })
        }
    }
}

module.exports = userController