const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { checkPass } = require('../helpers/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class UserController {

    static register = async (req, res, next) => {
        const { email, name, password } = req.body;
        try {
            let user = await User.create({ email, name, password });
            res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password
            });
        }
        catch(err) { next(err) }
    }

    static login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ where: { email }});
            if (user) {
                if (checkPass(password, user.password)) {
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    });
                    res.status(200).json({ access_token });
                } else {
                    throw { name: 'InvalidInput' }
                }
            } else {
                throw { name: 'InvalidInput' }
            }
        }
        catch(err) { next(err) }
    }

    static loginGoogle = async (req, res, next) => {
        const { id_token } = req.body;
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: GOOGLE_CLIENT_ID
            });
            let user = await User.findOne({ where: {
                email: ticket.getPayload().email
            }});
            if (!user) {
                const password = Math.random.toString().substring(0,10) + 'google';
                user = await User.create({
                    email: ticket.getPayload.email,
                    name: ticket.getPayload.give_name,
                    password
                });
            }
            const access_token = generateToken({
                id: user.id,
                email: user.email
            });
            res.status(200).json({ access_token });
        }
        catch(err) { next(err) }
    }

}

module.exports = UserController;