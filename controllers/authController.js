const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')

class AuthContoller {
    static login(req, res, next) {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: 'Cannot be empty' })
        }
        User
            .findOne({
                where: { email }
            })
            .then(user => {
                if (comparePassword(password, user.password)) {
                    const { id, name, email } = user
                    const access_token = generateToken({ id, name, email })
                    res.status(200).json({ access_token })
                } else {
                    res.status(400).json({message: 'Email or Password is wrong!'})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({message: 'Email or Password is wrong!'})
            })
    }

    static register(req, res, next) {
        const { name, email, password } = req.body
        User
            .create({ name, email, password })
            .then(newUser => {
                const { id, name, email } = newUser
                res.status(201).json({ id, name, email })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AuthContoller