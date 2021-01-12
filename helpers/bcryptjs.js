const bcrypt = require('bcryptjs')

const hashPass = (pass) => {
  const salt = bcrypt.genSaltSync(5)
  return bcrypt.hashSync(pass, salt)
}

const comparePass = () => {
  return bcrypt.compareSync(pass, hashPass)
}

module.exports = {hashPass, comparePass}