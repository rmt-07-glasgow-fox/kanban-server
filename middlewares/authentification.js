const { verifyToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

function authenticate(req, res, next){
    let decoded = verifyToken(req.headers.access_token)
    User.findOne({
        where : {
            email : decoded.email
        }
    })
    .then(user => {
        if(user){
            req.user = {
                id : user.id,
                email : user.email
            }
            next()
        } else {
            next({name : 'Do not have access'})
        }
    })
    .catch(err => {
       next(err)
    })
}

function authorization(req, res, next){
    const taskId = req.params.id
    const userId = req.user.id
    Task.findOne({
        where : {
            id : taskId
        }
    })
    .then(task => {
        if(task === null){
            next({name : "Not found"})
        } else if(task.UserId === userId){
            next()
        } else {
            next({name : 'Do not have access'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authenticate,authorization
}