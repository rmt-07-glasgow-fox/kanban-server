const { User } = require('../models')
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

module.exports = { 
    authenticate
}