const { User, Task } = require('../models')
const checkToken = require('../helpers/jwt.js').checkToken

async function authenticate(req, res, next) {
    try {
        const decoded = checkToken(req.headers.access_token)
        const found = await User.findByPk(decoded.id)
        
        if (!found) next({ name: 'notLogin' })
        else {
            req.user = found.id
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function authorize(req, res, next) {
    try {
        const found = await Task.findByPk(+req.params.id)
        if (!found) next({ name: 'notFound' })
        else {
            if (req.user === found.UserId) {
                next()
            } else {
                next({ name: 'unauthorized' })
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { 
    authenticate, authorize
}