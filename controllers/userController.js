const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models');
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
class UserControler {
    static welcome (req, res) {
        res.send('welcome to kanban')
    }
    
    static async login (req, res, next) {
        
        const {email, password} = req.body;

        if(!email || !password) {
            return next({name: 'LoginValidation'});
        }

        try {
            const user = await User.findOne({ where : {email: email}});

            if (!user) {
                return next({name : 'LoginFailed'})
            } else {
                const match = comparePassword (password, user.password)
                if(match) {
                    const payload = {
                        id : user.id,
                        email: user.email,
                        username: user.username
                    }
                    const access_token = generateToken(payload)
                    res.status(200).json({access_token})
                } else {
                    return next({name : 'LoginFailed'})
                }
            }
            
        } catch(err) {
            return next(err)
        }

    }

    static async register (req, res, next) {

        const {email, password} = req.body;

        if(!email || !password) {
            return next({name: 'RegisterValidation'});
        }

        try {
            const user = await User.create({email,password});
            const response = { id: user.id, email: user.email}
            return res.status(201).json(response);
        } catch (err) {
            next(err);
        }

    }

    static loginGoogle (req, res, next) {
        const { googleToken } = req.body
        let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
          idToken: googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        })
        .then(ticket => {
          const payload = ticket.getPayload();
          email = payload.email
    
          return User.findOne({
            where: {
              email
            }
          })
        })
        .then(user => {
          if(!user) {
            return User.create({
              email,
              password: Math.random()*1000+'password',
              username:'client'
            })
          } else {
            return user
          }
        })
        .then(user => {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken(payload)
          return res.status(200).json({
            access_token
          })
        })
        .catch(err =>{
          next(err)
        })
    }
}

module.exports = {UserControler}