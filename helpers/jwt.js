const jwt = require('jsonwebtoken');
let SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY);
}

function checkToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    generateToken,
    checkToken
}