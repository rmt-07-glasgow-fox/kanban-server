const { User } = require('../models')
const { compare } = require("../helpers/bcrypt")


class UserController {
    static login(req,res,next) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data) {
                if(compare(req.body.password, data.password)) {
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        message: 'email not registered'
                    }
                }
            } else {
                throw {
                    status: 404,
                    message: 'email not registered'
                }
            }
        })
        .catch(error => {

        })
    }

    static register(req,res,next) {
        const obj = {
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password,
            updatedAt: new Date(),
            createdAt: new Date
        }
        User.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
    }
}

module.exports = UserController