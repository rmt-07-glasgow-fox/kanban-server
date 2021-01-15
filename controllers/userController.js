const { Op } = require('sequelize');
const { User, Member } = require('../models/index');
const { checkPassword } = require('../helpers/bcrypt');
const { getToken } = require('../helpers/jwt');

class UserController {
    static async register (req, res, next) {
        try {
            let data = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            data = await User.create(data);

            data = {
                id: data.id,
                username: data.username,
                email: data.email
            }

            return res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.errors, name: "Validation Error" });
            }

            return next({ code: 500 });
        }
    }

    static async login (req, res, next) {
        try {
            let data = await User.findOne({ where: { email: req.body.email } });

            if (data) {
                if (checkPassword(req.body.password, data.password)) {
                    data = {
                        id: data.id,
                        email: data.email,
                        username: data.username
                    };

                    return res.status(200).json({ access_token: getToken(data) });
                } else {
                    return next({ code: 400, errors: [{ message: "Invalid email or password!" }] });
                }
            } else {
                return next({ code: 400, errors: [{ message: "Invalid email or password!" }] });
            }
        } catch (err) {
            return next({ code: 500 });
        }
    }

    static async getUser (req, res, next) {
        try {
            let board = await Member.findAll({ where: { orgId: req.params.orgId } });

            board = board.map(e => {
                return e.userId;
            });
            
            let data = await User.findAll({ where: { id: { [Op.not]: board } } });
            
            res.status(200).json(data);
        } catch (err) {
            next({ code: 500 });
        }
    }
}

module.exports = UserController;