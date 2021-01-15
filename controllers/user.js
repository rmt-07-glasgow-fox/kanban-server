const {User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('535236340893-os9slvac221sa575pimv5gl7qf73n35u.apps.googleusercontent.com');


class UserController {

    static async register (req, res, next) {
        try {
            let data = {
                email: req.body.email,
                password: req.body.password
            }
            const created = await User.create(data)
            res.status(201).json({id: created.id, email: created.email})
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            let data = {
                email: req.body.email,
                password: req.body.password
            }
            const findUser = await User.findOne({where: {email: data.email}})
            if(!findUser){
                throw {
                    status: 400,
                    message: 'Email/Password Wrong'
                }
            } else {
                if(verifyPassword(data.password, findUser.password)){
                    let access_token = generateToken({id: findUser.id, email: findUser.email})
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status: 400,
                        message: 'Email/Password Wrong'
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async google (req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token_google,
                audience: '535236340893-os9slvac221sa575pimv5gl7qf73n35u.apps.googleusercontent.com',
            })
            const payload = ticket.getPayload()
            const findUser = await User.findOne({where :
                {email : payload.email}
            })
            if(findUser){
                let access_token =  generateToken({id : findUser.id, email : findUser.email})
                res.status(200).json({access_token})
            } else {
                const newUser = await User.create({
                    email : payload.email,
                    password : payload.email
                })
                let access_token = generateToken({ id : newUser.id, email : newUser.email})
                res.status(201).json({access_token})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController