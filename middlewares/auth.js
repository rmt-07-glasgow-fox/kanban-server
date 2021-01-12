const { cekToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

class Auth {
    static authentication(req, res, next) {
        try {
            const { access_token } = req.headers
            if (access_token) {
                let payload = cekToken(access_token)
                User.findByPk(payload.id)
                    .then(user => {
                        !user ? next({ name: 'NotFoundError' }) :
                        req.UserData = payload, next()
                    })
                    .catch(err => {
                        next(err)
                    })
                
            } else {
                next({name: 'UnauthorizedError'})
            }
        } catch (err) {
            next(err)
        }
    }
    
    static authorization(req, res, next) {
        try {
            const id = +req.params.id
            Task.findByPk(id)
                .then(task => {
                    !task ? next({name: 'NotFoundError'}) :
                    task.UserId !== req.UserData.id ? next({name: 'ForbiddenError'}) :
                    next()
                })
                .catch(err => {
                    next(err)
                })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Auth