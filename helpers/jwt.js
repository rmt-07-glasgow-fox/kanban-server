const jwt = require('jsonwebtoken')
const SECRET_CODE = process.env.SECRET_CODE

const createToken = (payload) => {
    return token = jwt.sign(payload, SECRET_CODE)
}

const verifyToken = async (token) => {
    try {
        return decodedPayload = jwt.verify(token, SECRET_CODE)
    }
    catch (err) {
        throw new Error("Not authorised.")
    }
}

module.exports = {
    createToken, verifyToken
}
