const {User} = require('../models')
const checkToken = require('../helper/checkToken')

function authentication(req, res, next){
    let decoded = checkToken(req.headers.access_token)
    User.findOne({where:{emai: decoded.email}})
    .then(data=>{
        if(!data){
            next({name: 'forbiden'})
        }else{
            req.user = data
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}
module.exports = {authentication}