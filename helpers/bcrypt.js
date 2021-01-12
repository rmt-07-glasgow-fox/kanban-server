const bcrypt = require('bcrypt')
const saltRounds = 10

function hashPassword(password){
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password,salt)
    return hash
}

function checkPassword(password, hashPassword){
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = {
    hashPassword, checkPassword
}