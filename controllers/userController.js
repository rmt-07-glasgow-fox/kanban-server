const { OAuth2Client } = require('google-auth-library')
const { User, Task, Category } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static home(req, res, next)  {
        res.send('success')
    }

    static login(req, res, next)  {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            if (!data) {
                res.status(401).json({message: `invalid email or password`})
            }

            let match = comparePassword(password, data.password)
            if (match) {
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({ 
                    access_token: access_token 
                })
            } else{
                res.status(401).json({message: `invalid email or password`})
            }
        })
        .catch(err => {
            next()
        })
    }

    static loginGoogle(req, res, next) {
        let CLIENT_ID = process.env.CLIENT_ID
        const id_token = req.body.id_token
        const client = new OAuth2Client(CLIENT_ID);
        let email = null 
        console.log(req.body.id_token);
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
        })
        .then( ticket => {
            const payload = ticket.getPayload();
            email = payload.email
            return User.findOne({
            where: {
                email: email
            }
            })
        })
        .then( user => {
            if (!user) {
                return User.create({
                    email: email,
                    password: Math.random()*10000+ 'password'
                })
            } else {
                return user
            }
        })
        .then( user => {
            const payload = {
                    id: user.id,
                    email: user.email
            }
            const access_token = generateToken(payload)
            return res.status(200).json({ 
                    access_token: access_token 
            })
        })
        .catch( err => {
            next()
        })
    }

    static register(req, res, next)  {
        let newData = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newData)
        .then(data => {
            let showData = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(showData)
        })
        .catch(err => {
            next()
        })
    }

    
}

module.exports = Controller