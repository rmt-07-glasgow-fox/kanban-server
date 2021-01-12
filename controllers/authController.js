const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const generateToken = require('../helpers/generateToken');

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
                access_token
            })

        } catch (error) {
            return next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {

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