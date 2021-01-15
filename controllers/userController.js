const { User } = require('../models');

class UserController {
    static async getAll(req, res, next) {
        try {
            const user = await User.findAll({
                attributes: { exclude: ['created_at', 'updated_at'] }
            });

            return res.status(200).json({
                status: 'success',
                data: user
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController