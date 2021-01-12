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
            res.status(403).json({message : "You dont have access"})
        }
    })
    .catch(err => {
        res.status(500).json({message : "Internal Server Error"})
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
            res.status(404).json({message : "Not Found"})
        } else if(task.UserId === userId){
            next()
        } else {
            res.status(403).json({message : "Do Not Have Access"})
        }
    })
    .catch(err => {
        res.status(500).json({message : "Internal Server Error"})
    })
}

module.exports = {
    authenticate,authorization
}