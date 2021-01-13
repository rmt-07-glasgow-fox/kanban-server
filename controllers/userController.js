const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt.js')


class UserController {
    
    static registerHandler(req, res, next) {

        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json({data})
            })
            .catch(err => {
                res.status(500).json({message: "Internal Server Error"})
            })
    }

    static loginHandler(req, res, next) {

        const { email, password } = req.body

        User.findOne({
            where: {
                email
            }
        })
            .then(data => {
                
                if(data && comparePassword(password, data.password)) {

                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    
                    const access_token = generateToken(payload)
            

                    res.status(200).json({
                        access_token
                    })
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
    }

}

module.exports = UserController