const { User } = require('../models')
const { compare } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")


class UserController {
    static login(req,res,next) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data) {
                if(compare(req.body.password, data.password)) {
                    const access_token = generateToken({id: data.id, email:data.email})
                    const user = {
                        access_token: access_token,
                        name: data.name
                    }
                    res.status(200).json(user)
                } else {
                    throw {
                        status: 404,
                        message: 'wrong email/pasword'
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
            next(error)
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
            res.status(201).json({
                id: data.id,
                name: data.name, 
                email: data.email
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static googleLogin(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const id_token = req.body.id_token

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            const email = payload.email
            return User.findOne({where: {email: email}})
            .then(user => {
                if (user) {
                    return user
                } else {
                    const obj = {
                        name: payload.given_name,
                        email: email,
                        password: 'hehehehehe'
                    }
                    return User.create(obj)
                }
            })
            .then(user => {
                const access_token = generateToken({id: user.id, email:user.email})
                const name = user.name
                res.status(200).json({ access_token,name })
            })
            .catch(error => {
                console.log(error)
                next(error)
            })

        })
        .catch(error => {
            next(error)
        })
        
    }
}

module.exports = UserController