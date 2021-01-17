const { verifyToken } = require("../helpers/jsonwebtoken")
const { User, Task } = require('../models')

function authenticate (req, res, next) {
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({
            where: { email: decoded.email }
        })
            .then(data => {
                if(!data) {
                    next({ name: 'Invalid Input'})
                } else {
                    req.UserId = data.id
                    next()
                }
            })
            .catch(next)
    } catch (err) {
        next(err)
    }
}

function authorize (req, res, next) {
    let id = +req.params.id
    Task.findOne({
        where: { id }
    })
        .then(data => {
            if (!data || (data.UserId !== req.UserId)) {
                next({ name: 'Unauthorized'})
            } else {
                next()
            }
        })
        .catch(next)
}

module.exports = {
    authenticate, 
    authorize
}