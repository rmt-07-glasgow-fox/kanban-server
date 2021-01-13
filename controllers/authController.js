const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {genToken} = require('../helpers/jwt')

class Controller {
    static register(req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname
        }
        //console.log(obj)
        User.create(obj)
        .then(data =>{
            //console.log(data)
            return res.status(201).json({
                id: data.id,
                email: data.email,
                fullname: data.fullname
            })
        })
        .catch(err =>{
            next(err)
        })
    }

    static login (req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj)
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                next({name: `resourceNotFound`})
            }else {
                let match = compare(obj.password, data.password)
                if(match){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let access_token = genToken(payload)
                    return res.status(200).json({
                        access_token
                    })
                }else {
                    next({name: `accessDenied`})
                }
            }
        })
        .catch(err =>{
            //console.log(err)
            next(err)
        })
    }
}

module.exports = Controller