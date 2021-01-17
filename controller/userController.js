const { user } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class userController {
    static register (req, res, next) {
        let newuser = {
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }
        let dataUser
        // console.log(register);
        user.create(newuser)
        .then(data => {
            dataUser = {
                id: data.id,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            res.status(201).json({user: dataUser})
        })
        .catch(err => {
            res.status(500).json({message : "Invalid internal server"})
        })
    }

    static login (req, res, next) {
        let login = {
            email: req.body.email,
            password: req.body.password
        }
        user.findOne({where: {
            email: login.email
        }})
        
        .then( data => {
            let data_login = data.dataValues
            const passMatch = comparePassword(login.password, data_login.password)  
                if(passMatch){
                    let payload = { 
                        id: data_login.id,
                        email: data_login.email
                    } 
                    const access_token = generateToken(payload)  
                    return res.status(200).json({access_token})
                } else {
                    next({name: 'JsonWebTokenError', msg: 'Invalid Email/Phone Number or Password'})
                }
        })
        .catch(err => {
            next({name: 'NotFoundError', msg: 'Invalid Email/Phone Number or Password'})

        })
    }
}

module.exports = userController