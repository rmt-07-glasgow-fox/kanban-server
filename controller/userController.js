const { User } = require('../models')

const { OAuth2Client } = require('google-auth-library');
const { genToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')


const { randomPass } = require('../helper/randomPass')

class UserController {
    static async register (req, res, next) {
        let newUser = {
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
        }

        try {   
            const user = await User.create(newUser) 

            res.status(201).json({
                id : user.id,
                fullname : user.fullname,
                email : user.email
            })
        } catch (err) {
            next(err)
        }
    }


    static async login (req, res ,next) {
        let em = req.body.email
        let pass = req.body.password

        try {
            const  user = await User.findOne( { where  : 
                { email : em }
            })

            let compare  = comparePass(pass, user.password)

            if(!user) {
                next( { name : 'authError' })
            } else {
                if(compare) {
                    const access_token = genToken({
                        id : user.id,
                        email : user.email
                    })

                    res.status(200).json({
                        access_token
                    })
                } else {
                    next( { name : 'authError'})
                }
            }

        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        
        let payload

        client.verifyIdToken({
            idToken : req.body.googleToken,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return User.findOne({where : 
             { email : payload.email }
         })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                return User.create({email : 
                 { 
                     email : payload.email,
                     password : randomPass()
                 }
             })
 
            }
        })
        .then(user => {
            const access_token = getToken({
                id : user.id,
                email : user.email
            })
 
            res.status(200).json({
                access_token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static async getUser(req, res, next) {
        try {
            const getData = await User.findAll()

            if(!getData) {
                next( { name : 'notFound'})

            } else {
                res.status(200).json(getData)
            }
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        let idEdit = +req.params.id

        let edittedUser = {
            email : req.body.email,
        }
        
        try {
            const data = await User.update(edittedUser, {where :
                { id : idEdit}
            })
            if(!data) {
                next({ name : 'notFound'})

            } else {
                res.status(200).json(data)
            }
        
        } catch (err) {
            next(err)
        }
        
    }
}

module.exports = UserController