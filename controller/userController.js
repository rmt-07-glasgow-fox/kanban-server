const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');


class userControl {
    static async register (req, res) {
        const { email, password, username } = req.body
        try {
            const create = await User.create({
                email, password, username
            })
            res.status(201).json({
                id: create.id,
                username: create.username,
                email: create.email,
            })
        } catch (err) {
            res.status(500).json({
                msg: 'Error in internal server',
            })
        }
    }
    static async login (req, res) {
        // res.send('data  ')
        const { email, password } = req.body
        try {
            const dataBase = await User.findOne({
                where : { email }
            })
            if (!dataBase) {
                res.status(401).json({
                    msg: 'Email or password is undefined'
                })
            } else {
                const good = comparePassword(password, dataBase.password)
                if (!good) {
                    res.status(401).json({
                        msg: 'Email or password is undefined'
                    })
                } else {
                    const data = {
                        id: dataBase.id,
                        email: dataBase.email,
                    }
                    const access_token = generateToken(data)
                    res.status(200).json({
                        access_token
                    })

                }
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
    static async googleLogin (req, res) {
        try {
            const {id_token } = req.body
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_KEY,
            });
            const payload = ticket.getPayload();
            const find = await User.findOne({
                where: { email: payload.email }
            })
            if (find) {
                const access_token = generateToken({
                    id: payload.id,
                    email: payload.email
                })
                res.status(200).json({
                    access_token
                })
            } else {
                const newUser = await User.create({
                    email: payload.email,
                    password: new Date().toString + 'random'
                })
                const access_token = generateToken({
                    id: newUser.id,
                    email: newUser.email
                })
                res.status(201).json({
                    access_token
                })
            }
        } catch (err) {
            res.status(500).json(err)            
        }
    }
}

module.exports = userControl