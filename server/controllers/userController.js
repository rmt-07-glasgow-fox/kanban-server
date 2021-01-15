const { User } = require ("../models")
const { comparePassword } = require ("../helpers/bcrypt")
const { getToken } = require ("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register (req, res, next) {
        const {username, email, password} = req.body

        User.create ({
            username,
            email,
            password
        })
        .then (result => {
            res.status (200).json ({ id: result.id, username: result.username, email: result.email })
        })
        .catch (err => {
            next(err)
        })
    }

    static login (req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email }})
        .then (result => {
           
            if (result) {
                const checkUser = comparePassword(password, result.password)

                if (checkUser) {
                    const payload = {
                        id: result.id,
                        username: result.username,
                        email: result.email
                    }

                    const access_token = getToken (payload)

                    res.status (200).json ({ access_token })
                } else {
                    next ({ name: "WrongInput" })
                }
            } else {
                next ({ name: "WrongInput" })
            }
        })
        .catch(err => {
            console.log(err)
            next(err)
        })

    }

    static loginGoogle (req, res, next) {
        // console.log(req.body.id_token)
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email = ""
        let username = ""
        console.log(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then (ticket => {
            const payload = ticket.getPayload();
            console.log(email, username)
            console.log(payload)
            email = payload.email
            username = payload.name

            //setelah dapat email, kita cocokkan apakah di database User email telah terdaftar
            //jika belum, maka diregistrasikan lalu generate JWT
            //jika sudah, generate JWT
            //setelahnya baru kita kembalikan via res.status

            return User.findOne({
                where: {
                    email
                }
            })     
        })
        .then (result => {
            // console.log(result)
            if (!result) {
                return User.create ({
                    username,
                    email,
                    password: Math.floor(Math.random()*1000) + "Pass"
                })
            } else {
                return result
            }
        })
        .then (result => {
            
            const payload = {
                id : result.id,
                email : result.email
            }

            const access_token = getToken (payload)
            
            return res.status (200).json ({
                access_token
            })

        })
        .catch (err => {
            console.log(err)
            next(err)
        })
    }

}

module.exports = UserController