const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

const createHash = (password) => {
  return bcrypt.hashSync(password, salt)
}

const checkHash = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  createHash,
  checkHash
}
