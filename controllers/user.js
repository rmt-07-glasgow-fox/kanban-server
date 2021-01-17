const {User,Task} = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const genPassword = require('../helpers/randPassword')

class UserController {
    static async login(req,res,next){
        try {
            let {email,password} = req.body
            let result = await User.findOne({
                where:{
                    email,
                }
            })
            if(result){
                if(compare(password,result.password)){
                    let payload = {
                        id: result.id,
                        email: result.email
                    }
                    let access_token = generateToken(payload)
                    res.status(200).json({access_token})
                }else{
                    next({name: 'NotFound', message: 'Email / password salah'})
                }
            }else{
                next({name: 'NotFound', message: 'Email / password salah'})
            }
        } catch (error) {
            next(error)
        }
    }

    static async register(req,res,next){
        try {
            let data = req.body
            let result = await User.create(data)
            if(result){
                let {id,email,createdAt} = result
                let response = {
                    id,
                    email,
                    createdAt
                }
                res.status(201).json(response)
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req,res,next){
        try {
            const token = req.body.token;
            const client = new OAuth2Client(process.env.CLIENT_ID)
    
            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload();
            let user = {
                email: payload.email,
                password: genPassword(8)
            }
            let data = await User.findOne({where : {email:user.email}})
            if(data) {
                const access_token = generateToken({
                        id: data.id,
                        email: user.email,
                        });
                res.status(200).json({access_token});
            } else {
                let newUser = User.create(user);
                const access_token = generateToken({
                    id: newUser.id,
                    email: newUser.email,
                    });
                res.status(200).json({access_token});
            } 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController