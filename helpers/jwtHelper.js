const jsonwebtoken = require('jsonwebtoken')

const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET)
}

const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  generateToken,
  verifyToken
}