const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload){
    return jwt.sign(payload, SECRET_KEY)
}

module.exports = generateToken