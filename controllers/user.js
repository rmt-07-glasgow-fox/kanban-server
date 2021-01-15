const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class ControllerUser {

    static findUser(req, res, next) {
        User.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static register (req, res, next) {
        console.log(req.body);
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj);
        User.create(obj)
        .then(user => {
            const response = {
                id: user.id,
                email: user.email
            }
            res.status(200).json(response)
        })
        .catch(err => {
                next(err)
        })
    }
    static async login (req, res, next) {
        console.log(req.body);
        try {
            let obj = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(obj.email);
            const user = await User.findOne({
                where: { 
                    email: req.body.email 
                }
            })
            console.log(obj);
            if (!user) {
                return next({
                    name: "invalid email / password" 
                })
            }
            const match = comparePassword(obj.password, user.password)
            if (match) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token
                })
            } else {
                return next({
                    name: "invalid email / password" 
                })
            }

        } catch (error) {
            console.log(error);
            return next(error)
        }
    }


    static async loginGoogle(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { id_token } = req.body
        try {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload()
            const userlogin = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (userlogin) {
                const payload = {
                    id: userlogin.id,
                    email: userlogin.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({
                    access_token: access_token
                })
            } else {
                const createuser = await User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_SECRET
                })
                const access_token = generateToken({id:createuser.id, email:createuser.email})
                res.status(200).json({
                    access_token: access_token
                })
            }
        } catch (error) {
            next(error)
        }
    }

   
}

module.exports = ControllerUser