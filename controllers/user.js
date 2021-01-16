const {User} = require('../models/index')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserCon{
    static register(req,res,next){
        User.create(req.body)
        .then(data=>{
            res.status(201).json({id:data.id,email:data.email})
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        let password = req.body.password
        User.findOne({where:{email:req.body.email}})
        .then(data=>{
            if (data) {
                let hash = data.password
                if (compare(password,hash)) {
                    let user = {
                        id:data.id,email:data.email
                    }
                   
                    let accesstoken = generateToken(user)
                    res.status(200).json({accesstoken})
                } else {
                    next({name:'invalidLogin'})
                }
            }else{
                next({name:'invalidLogin'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static oAuthGoogle(req,res,next){
        let user = req.body.user
        user.password += 'qwerty123456789zxcvbnm',
        
        User.findOne({where:{email:user.email}})
        .then(data=>{
            if (data) {
                let hash = data.password
                if (compare(user.password,hash)) {
                    let user = {
                        id:data.id,email:data.email
                    }
                    let accesstoken = generateToken(user)
                    res.status(200).json({accesstoken})
                } else {
                    next({name:'invalidLogin'})
                }
            } else {
                return User.create(user)
            }
        })
        .then(data=>{
            if (data) {
                let hash = data.password
                if (compare(password,hash)) {
                    let user = {
                        id:data.id,email:data.email
                    }
                    let accesstoken = generateToken(user)
                    res.status(200).json({accesstoken})
                } else {
                    next({name:'invalidLogin'})
                }
            }else{
                next({name:'invalidLogin'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserCon