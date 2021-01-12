const { User } = require('../models')
const { decrypt, generateToken } = require('../helpers')

class UserController{
    static handleRegister(req, res, next){
        let value = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(value)
        .then(data => {
            let result = {
                id: data.id,
                email: data.email,
                username: data.username
            }
            res.status(201).json(result)
        })
        .catch(err => {
            if(err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next(err)
            }
            // res.send(err)
        })
    }
    
    static handleLogin(req, res, next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {email}
        })
        .then(data => {
            if(data){
                if(decrypt(password, data.password)){
                    let access_token = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({
                        access_token,
                        username: data.username
                    })
                } else {
                    res.status(401).json({
                        message: "Email/password not valid"
                    })
                }
            } else {
                res.status(401).json({
                    message: "Email not found, please register first"
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController