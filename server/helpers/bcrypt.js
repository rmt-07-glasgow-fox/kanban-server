const bcrypt = require('bcryptjs')

function hashPassword(planPassword){
    const salt = bcrypt.genSaltSync(7)
    const hash = bcrypt.hashSync(planPassword, salt)

    return hash
}

function comparePassword(pwd, hashPassword){
    return bcrypt.compareSync(pwd, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}