const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

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
}


module.exports = UserController