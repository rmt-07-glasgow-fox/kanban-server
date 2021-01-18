const { User } = require('../models')
const { comparePass } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')

class UserController{
    static addNew(req,res,next){
        const {name, email, password} = req.body  
        console.log(req.body.name);
        User.create({name, email, password})
        .then(data => {
            res.status(201).json({id: data.id, name : data.name, email:data.email})
        })
        .catch(err => {
            next(err)
        })
    } 
    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({
            where:{
                email:email
            }
        })
        .then(data => {
            if (data.email != email) {
                res.status(401).json({
                    msg: 'Invalid Email/Password'
                })
            } 
            if (comparePass(password, data.password)) {
                const payload = {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({
                    access_token : access_token
                })
            } else {
                throw{
                    msg: 'Invalid Email/Password'
                }
            }
        })
        .catch(err => { 
            next(err)
        })
    }
}

module.exports = {UserController}