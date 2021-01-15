const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const {OAuth2Client} = require('google-auth-library');


class UserController {
    static async register(req,res,next){
        try {
            const input ={
                email: req.body.email,
                password: req.body.password
            }
            
            const newUser = await User.create(input)
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
            
        } catch (err) {
            next(err)
        }
    }
    static async login(req,res,next){
        try {
            
            console.log(req.body);
            const input = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: input.email
                }
            })
            if(!user){
                res.status(401).json({ msg: 'Wrong email or password' })
            }else if (!comparePass(input.password, user.password)){
                res.status(401).json({ msg: 'Wrong email or password' })
            }
            else{
                const access_token = loginToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ access_token })
            }

        } catch (err) {
            res.status(500).json(err.message)
        }
    }
    static async googleLogin(req, res) {
        try {
        const google_token = req.body.google_token;
        console.log(google_token);
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("ini payload");
        console.log(payload);
        const email = payload.email;
        const user = await User.findOne({ where: { email: payload.email } });
        if (user) {
            const access_token = loginToken({
            id: user.id,
            email: user.email,
            });
            res.status(200).json({access_token});
        } else {
            const userObj = {
            email,
            password: "random",
            };
            const newUser = await User.create(userObj);
            const access_token = loginToken({
            id: newUser.id,
            email: newUser.email,
            });
            res.status(200).json({access_token});
        }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController