const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_KEY
function generateToken (dataUser) {
    // console.log(process.env.JWT_KEY, "ini env");
    return jwt.sign(dataUser, process.env.JWT_KEY)
}
function verifyToken (dataUser) {
    return jwt.verify(dataUser, jwt_secret)
}

module.exports = { generateToken, verifyToken }