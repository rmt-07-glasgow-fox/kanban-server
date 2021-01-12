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
                email: create.email, 
                password: create.password, 
                username: create.username
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async login (req, res) {
        // res.send('data  ')
        const { email, password } = req.body
        try {
            const dataBase = await User.findOne({
                where : { email }
            })
            // console.log(dataBase);
            if (!dataBase) {
                res.status(401).json({
                    msg: 'Email or password is undefined'
                })
            } else {
                const good = comparePassword(password, dataBase.password)
                // console.log(dataBase.dataValues);
                if (good) {
                    const data = {
                        id: dataBase.id,
                        email: dataBase.email,
                    }
                    const access_token = generateToken(data)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    res.status(401).json({
                        msg: 'Email or password is undefined'
                    })
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async googleLogin (req, res) {
        const google_token = req.body.google_token
        try {
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_KEY,
            });
            const payload = ticket.getPayload();
            const find = await User.findOne({
                where: {email: payload.email}
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
                res.status(200).json({
                    access_token
                })
            }
        } catch (err) {
            res.status(500).json(err)            
        }
    }
}

module.exports = userControl