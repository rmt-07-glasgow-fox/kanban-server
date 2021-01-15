const { OAuth2Client } = require('google-auth-library')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class AuthContoller {
    static login(req, res, next) {
        const { email, password } = req.body
        if (!email || !password) {
            next({ name: 'CustomError', statusCode: 400, message: 'Email or Password cannot be empty!' })
        } else {
            User
                .findOne({
                    where: { email }
                })
                .then(user => {
                    if (comparePassword(password, user.password)) {
                        const { id, name, email } = user
                        const access_token = generateToken({ id, name, email })
                        res.status(200).json({ access_token })
                    } else {
                        next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'})
                    }
                })
                .catch(err => {
                    console.log(err);
                    next({name: 'CustomError', statusCode: 400, message: 'Email or password wrong!'})
                })
        }
    }

    static register(req, res, next) {
        const { name, email, password } = req.body
        User
            .create({ name, email, password })
            .then(newUser => {
                const { id, name, email } = newUser
                res.status(201).json({ id, name, email })
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogle(req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let email, name
        client
            .verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                email = payload.email;
                name = payload.name;
                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                const password = Math.random()*100000+process.env.JWT_KEY
                return !user ? User.create({ name, email, password }) : user
            })
            .then(user => {
                const { id, email, name } = user
                const access_token = generateToken({ id, email, name })
                res.status(200).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = AuthContoller