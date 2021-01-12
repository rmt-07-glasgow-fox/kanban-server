const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_KEY
function generateToken (dataUser) {
    // console.log(process.env.JWT_KEY, "ini env");
    return jwt.sign(dataUser, jwt_secret)
}
function verifyToken (dataUser) {
    return jwt.verify(dataUser, process.env.JWT_KEY)
}

module.exports = { generateToken, verifyToken }