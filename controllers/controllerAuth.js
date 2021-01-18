const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { comparePassword } = require('../helpers/bcryptjs.js')
const { generateToken } = require('../helpers/jwt.js')

module.exports = class AuthController {
    static getUsers(req, res, next) {
        User.findAll({
            attributes: {
                exclude: [ 'password', 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static createUser(req, res, next) {
        const { name, email, password } = req.body

        User.create({
            name, email, password
        })
        .then( data => {
            const response = {
                id: data.id,
                name: data.name,
                email: data.email
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static deleteUser(req, res, next) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'User has been deleted' })
            } else {
                next({ name: "notFound" })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) next({ name: 'loginFailed' })
            
            const match = comparePassword(password, user.password)

            if (match) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token: access_token
                })
            } else next({ name: 'loginFailed' })

        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID,
            })
            const payload = ticket.getPayload();
            const email = payload.email;
            const name = payload.name;
            const found = await User.findOne({
                where: {
                    email: email
                }
            })
            
            if (!found) {
                found = await User.create({
                    name,
                    email,
                    password: Math.random()*100 + 'fancytodos'
                })
            }

            const pyld = {
                id: found.id,
                name: found.name,
                email: found.email
            }
            const access_token = generateToken(pyld)
            res.status(200).json({ access_token: access_token })
        } catch (err) {
            next(err)
        }
    }
}