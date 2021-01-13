const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (payload) => {
  console.log('SECRET_KEY', SECRET_KEY);
  return jwt.sign(payload, SECRET_KEY)
}

const decodedToken = (token) => {
  return jwt.verify(token, SECRET_KEY)
}

module.exports = { generateToken, decodedToken }