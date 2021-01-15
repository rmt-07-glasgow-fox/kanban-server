const errorHandler = require('./errorHandler')
const { authenticate, authorized, categoriesAuth } = require('./auth')

module.exports = {
    errorHandler,
    authenticate,
    authorized,
    categoriesAuth
}