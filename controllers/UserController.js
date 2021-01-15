const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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
                    email: user.email,
                    password: user.password
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
                else {
                    res.status(200).json({
                        name: user.name,
                        access_token: generateToken({
                            id: user.id,
                            email: user.email
                        })
                    })
                }

            })
            .catch(err => {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  
        })
        .then(ticket => {
            let { name, email } = ticket.getPayload()
            let password = (Math.floor(Math.random() * 10000000000000000)).toString();

            return User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    name,
                    password
                }
            })
        })
        .then(user => {
            res.status(200).json({
                name: user[0].name,
                access_token: generateToken({
                    id: user[0].id,
                    email: user[0].email
                })
            })
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserController;