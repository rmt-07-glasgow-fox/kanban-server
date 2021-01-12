const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models');
const { compare } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');

class Controller {
    static async register(req, res, next) {
        try {
            const { userName, email, password } = req.body;
            const input = {
                userName,
                email,
                password
            }
            const user = await User.create(input);
            const output = {
                id: user.id,
                userName: user.userName,
                email: user.email,
                password: user.password
            }
            res.status(201).json(output);
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                let errMsg = [];
                err.errors.forEach(el => {
                    errMsg.push(el.message);
                });
                res.status(400).json({ message: errMsg});
            } else {
                res.status(500).json(err);
            }
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const find = await User.findOne({
                where: {
                    email
                }
            })
            if (compare(password, find.password)) {
                const payload = {
                    id: find.id,
                    userName: find.userName,
                    email: find.email
                }
                const access_token = generateToken(payload);
                res.status(200).json({ access_token });
            } else {
                throw { name: "TypeError"};
            }
        } catch (err) {
            if (err.name === "TypeError") {
                err.name = "Invalid Email / Password";
                err.message = "Invalid Email / Password";
                res.status(403).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    static signInGoogle(req, res, next) {
        const { id_token } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let email = ''

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email;
            return User.findOne({
                where: {
                    email
                }
            })
        })
        .then(user => {
            if (!user) {
                return User.create({
                    email,
                    password: Math.random()*1000 + 'kanban password google'
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
            res.status(200).json({access_token})
        })
        .catch(err => {
            next(err )
        })
    }
}

module.exports = Controller;