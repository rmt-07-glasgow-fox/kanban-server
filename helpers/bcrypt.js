const bcrypt = require('bcryptjs')

function generatePassword (password) {
    let salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(password, salt)
}

function verifyPassword (password, passwordDb) {
    return bcrypt.compareSync(password, passwordDb)
}

module.exports = {
    generatePassword,
    verifyPassword
}