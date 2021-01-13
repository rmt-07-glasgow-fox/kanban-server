const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    const access_token = req.headers.access_token
    try {
        if (!access_token) {
            throw {
                status: 401,
                message: `Please Login First`
            }
        } else {
            const decoded = verifyToken(access_token)
            req.loggedIn = decoded
            next()
        }
    } catch (error) {
        next(error)
    }
}