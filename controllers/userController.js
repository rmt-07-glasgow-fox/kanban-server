const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
    static async register(req, res){
        try {
            const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.create(opt)
            const response = {
                id: result.id,
                email: result.email
            }

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async login(req, res){
        try {
           const opt = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await User.findOne({
                where: {
                    email: opt.email
                }
            })

            if(!result){
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }

            const match = comparePassword(opt.password, result.password)

            if(match){
                const payload = {
                    id: result.id,
                    email: result.email
                }

                const access_token = generateToken(payload)

                return res.status(200).json({
                    access_token
                })
            } else {
                return res.status(401).json({
                    message: 'Invalid email / password'
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async googleLogin(req, res, next){
        try {
            const { id_token } = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const payload = ticket.getPayload()

            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(user){
               const access_token = generateToken({
                    id: user.id,
                    email: user.email
                })
                return res.status(200).json({
                    access_token
                })
            } else {
                 const opt = {
                    email,
                    password: 'random'
                }

                const newUser = await User.create(opt)
                const access_token = generateToken({
                    id: newUser.id,
                    email: newUser.email
                })
                return res.status(200).json({
                    access_token
                })
            }

        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }
}

module.exports = UserController