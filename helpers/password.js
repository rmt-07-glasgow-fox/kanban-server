const bcrypt = require('bcryptjs')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function isPasswordValid(inputPassword, dbPassword) {
    return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {
    hashPassword, isPasswordValid
}