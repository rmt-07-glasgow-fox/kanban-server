const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, dbPassoword) => {
    return bcrypt.compareSync(password, dbPassoword);
}

module.exports = { hashPassword, comparePassword };