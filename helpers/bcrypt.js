const bcrypt = require("bcryptjs")

function hashPassword(input) {
  const salt = bcrypt.genSaltSync(9)
  return bcrypt.hashSync(input, salt)
}

function comparePass(input, hashed) {
  return bcrypt.compareSync(input, hashed)
}

module.exports = {
  hashPassword,
  comparePass
}