const {User} = require('../models')
const Bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const verifyGoogle = require('../helpers/verifyGoogleToken')

class UserController {
    static login (req,res) {
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {
                    res.status(400).json({msg: 'email or password is incorrect!'})
                } else {
                    const verified = Bcrypt.compare(req.body.password, user.password)
                    if(verified) {
                        const token = jwt.sign({id: user.id}, process.env.SECRET)
                        res.status(200).json({token})
                    } else {
                        res.status(400).json({msg: 'email or password is incorrect!'})
                    }
                }
            })
            .catch(err => res.status(500).json(err))
    }

    static register (req, res) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                const token = jwt.sign({id: user.id}, process.env.SECRET)
                res.status(201).json({token})
            })
            .catch(err => res.status(500).json(err))
    }

    static async googleLogin(req, res, next) {
        const google_token = req.headers.google_token

        try {
            const payload = await verifyGoogle(google_token)
            const email = payload.email
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const password = '123'
            if(user) {
                let check = Bcrypt.compare(password, user.password)
                if(check) {
                    const token = jwt.sign({id: user.id, email: user.email, }, process.env.SECRET)
                    res.status(200).json({token})
                } else {
                    
                }
            } else {
                const newUser = await User.create({
                    email,
                    password
                })
                const token = jwt.sign({id: newUser.id, email: newUser.email, }, process.env.SECRET)
                res.status(200).json({token})
                // console.log({token});
                
            }
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = UserController