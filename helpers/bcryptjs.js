const bcryptjs = require('bcryptjs')

function hashPassword(plainPassword) {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(plainPassword, salt)

    return hash
}

function comparePassword(plainPassword, dbPassword) {
    return bcryptjs.compareSync(plainPassword, dbPassword)
}

module.exports = {
    hashPassword, comparePassword
}