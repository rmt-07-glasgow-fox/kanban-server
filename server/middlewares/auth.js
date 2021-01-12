const { verifyToken } = require('../helpers')
const { User, Kanban } = require('../models')

function authenticate(req, res, next){
    try {
        let decode = verifyToken(req.headers.access_token)
        console.log(decode);
        User.findByPk(decode.id)
        .then(data => {
            if(data){
                req.userData = {
                    id: data.id,
                    email: data.email
                }
                next()
            } else {
                next({
                    status: 401
                })
            }
        })
        .catch(err => {
            next(err)
        })
    } catch (error) {
        next({status: 400})
    }

}

function authorized(req, res, next){
    let taskId = req.params.id
    let userId = req.userData.id
    Kanban.findByPk(taskId)
    .then(data => {
        if(data){
            if(data.UserId == userId){
                next()
            } else {
                next({status: 401})
            }
        } else {
            next({status: 404})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    authenticate,
    authorized
}