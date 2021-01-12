const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {
    static register(req, res, next){
        const newUser = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where : {
                email
            }
        })
        .then(user =>{
            if(user){
                if(checkPassword(password, user.password)){
                    const payload = {
                        id : user.id,
                        email : user.email
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({access_token})
                } else {
                    res.status(400).json({message : "Invalid Email / Password"})
                }
            } else {
                res.status(400).json({message : "Invalid Email / Password"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = userController