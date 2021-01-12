const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const generateToken = payload => {
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

const verifyToken = token => {
  const isMatched = jwt.verify(token, SECRET_KEY)
  return isMatched
}

module.exports = { generateToken, verifyToken }