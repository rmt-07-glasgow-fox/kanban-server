const bcrypt = require("bcryptjs")

exports.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(process.env.SALT)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

exports.compareHash = (password, hPassword) => {
  return bcrypt.compareSync(password, hPassword)
}