const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { genToken } = require('../helpers/jwt')

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
}

module.exports = UserController