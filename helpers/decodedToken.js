const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const decodedToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = decodedToken;