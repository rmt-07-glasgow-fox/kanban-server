const decodeToken = require('../helpers/decodedToken');
const { User } = require('../models');

const isLogin = async(req, res, next) => {
    try {
        const { access_token } = req.headers;
        const decoded = decodeToken(access_token);

        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) return next({ name: 'authValidate' });

        req.user = decoded;

        next()
    } catch (error) {
        return next(error);
    }
}

module.exports = isLogin;