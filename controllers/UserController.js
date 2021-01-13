const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            })
            .catch(err => {
                next(err)
            })

    }

    static login(req, res, next) {
        let { email, password } = req.body;

        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                let isLogin = !user ? false : comparePassword(password, user.password);

                if (!isLogin) throw new Error ('InvalidEmailPassword');

                res.status(200).json({
                    access_token: generateToken({
                        id: user.id,
                        email: user.email
                    })
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;