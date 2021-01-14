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

        console.log(user)

        User.create(user)
            .then(data => {
                const sent = {
                    id: data.id,
                    email: data.email,
                    username: data.username
                }

                console.log(sent)
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
                    //res.status(401).json({message: 'invalid email'})
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

                console.log('find one')
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
                    //res.status(401).json({message: 'invalid email'})
                    next({
                        message: 'Invalid email/password',
                        code: 401,
                        from: 'Controller User: login user'
                    })
                }

            })
            .catch(err => {
                //res.status(500).json({message: err.message})
                next({
                    message: err.message,
                    code: 400,
                    from: 'Controller User: login user'
                })
            })
    }
}

module.exports = Controller