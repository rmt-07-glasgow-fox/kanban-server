const jwt = require('jsonwebtoken')

function generateToken (data) {
    return jwt.sign(data, 'ayam')
}

function verifyToken (data) {
    return jwt.verify(data, 'ayam')
}

module.exports = {
    generateToken,
    verifyToken
}