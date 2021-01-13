const { User, Task } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { compareSync } = require('bcryptjs')

class UserController {
    static register(req, res) {
        const { username, email, password } = req.body
        let obj = {
            username,
            email,
            password
        }
        
        User.create(obj)
        .then(data => {
            let obj = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(obj)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({ message: 'Invalid Email / Password'})
            }
            const isValidPass = comparePass(password, user.password)
            if (!isValidPass) {
                console.log('masuk inva')
                next({ message: 'Invalid Email / Password'})
            } else {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token })
            }

        } catch (err) {
            console.log(err)
        }
    }

    static googleLogin(req, res) {

    }
}

module.exports = { UserController }