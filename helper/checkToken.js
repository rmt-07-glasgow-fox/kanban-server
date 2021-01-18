const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function checkToken(access_token){
    return jwt.verify(access_token,SECRET_KEY)
}

module.exports = checkToken