const {decodeToken} = require('../helper/jwt')
const {User,Kanban} = require('../models/index')

function authentication(req,res,next){
    let user = decodeToken(req.headers.accesstoken)
    User.findByPk(user.id)
    .then(data=>{
        if (data) {
            next()
        } else {
            res.status(401).json({message: `Invalid Authentication`})
        }
    })
    .catch(err=>{
        next(err)
    })
}

function authorization(req,res,next) {
    let user = decodeToken(req.headers.accesstoken)
    Kanban.findOne(req.params.id)
    .then(data=>{
        if (user.id == data.UserId) {
            next()
        } else {
            res.status(401).json({message: `Invalid Authorization`})
        }
    })
    .catch(err=>{
        console.log(err);
        next(err)
    })
}

module.exports = {authentication,authorization}