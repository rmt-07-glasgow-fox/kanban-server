require("dotenv").config()

const bcrypt = require("bcryptjs")
const saltSecret = process.env.SALT
console.log(saltSecret);

exports.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(saltSecret)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

exports.compareHash = (password, hPassword) => {
  return bcrypt.compareSync(password, hPassword)
}