const jwt = require('jsonwebtoken')
// const secretKey = "akusiapa"
const secretKey = process.env.secretKey

function generateToken(payload) {
    let token = jwt.sign(payload, secretKey)
    return token
}

function cekToken(token) {
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    cekToken
}