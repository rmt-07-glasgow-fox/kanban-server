const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function createToken(input) {
    return jwt.sign(input, JWT_SECRET)
}

function readToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    createToken, readToken
}