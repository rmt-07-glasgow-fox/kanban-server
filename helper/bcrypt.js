const bcrypt = require('bcryptjs')

function hashPassword(password){
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
}

function comparePassword(userPassword, dbPassword){
      return bcrypt.compareSync(userPassword, dbPassword)
}

module.exports = { hashPassword, comparePassword }