const {User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

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
}

module.exports = UserController