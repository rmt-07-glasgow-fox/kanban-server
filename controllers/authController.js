const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const generateToken = require('../helpers/generateToken');
const { OAuth2Client } = require('google-auth-library');

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) return next({ name: 'authValidate' });

            const checkPassword = comparePassword(password, user.password);
            if (!checkPassword) return next({ name: 'authValidate' });

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = generateToken(payload);

            return res.status(200).json({
                status: 'success',
                access_token,
                fullname: user.fullname(),
            })

        } catch (error) {
            return next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const { id_token } = req.body;
            const client = new OAuth2Client(process.env.GOOGLE_SECRET_KEY);

            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: id_token,
                    audience: process.env.GOOGLE_SECRET_KEY,
                });
                const payload = ticket.getPayload();
                const email = payload.email;
                const firstName = payload.given_name;
                const lastName = payload.family_name;

                let checkUser;
                checkUser = await User.findOne({ where: { email } });

                if (!checkUser) {
                    checkUser = await User.create({
                        firstName,
                        lastName,
                        email,
                        password: Math.random() * 1000 + ' google random password rahasia'
                    })
                }

                const payloadJwt = {
                    id: checkUser.id,
                    email: checkUser.email
                }

                const access_token = generateToken(payloadJwt);

                return res.status(201).json({
                    status: 'success',
                    fullname: checkUser.fullname(),
                    access_token
                })
            }
            verify().catch(err => next(err))
        } catch (error) {
            return next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, password, firstName, lastName } = req.body;
            const input = { email, password, firstName, lastName };

            const data = await User.create(input)

            return res.status(201).json({
                status: 'success',
                data
            })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = AuthController