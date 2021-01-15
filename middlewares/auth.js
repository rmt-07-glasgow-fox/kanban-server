const {User, Task} = require('../models')
const {cekToken} = require('../helpers/jwt')

function authenticate(req, res ,next){
    try {
        let decoded = cekToken(req.headers.access_token)
        User.findOne({where: {email: decoded.email}})
        .then(data =>{
            if(!data){
                next({name: `accessDenied`})
            }else{
                req.user = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
        })
        .catch(err =>{
            next(err)
        })
    } catch (err) {
        next(err)
    }
}

function authorize(req, res, next){
    Task.findOne({where: {id: req.params.id}})
    .then(data =>{
        if(!data){
            next({name: `resourceNotFound`})
        }else if(data.userId !== req.user.id){
            next({name: `accessDenied`})
        }else{
            next()
        }
    })
    .catch(err =>{
        next(err)
    })
}

module.exports = {authenticate, authorize}