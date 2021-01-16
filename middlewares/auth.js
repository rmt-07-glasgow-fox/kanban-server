const { User, Task } = require('../models');
const { checkToken } = require('../helpers/jwt');

const authenticate = async (req, res, next) => {
    const decoded = checkToken(req.headers.access_token);
    try {
        const user = await User.findOne({ where: { email: decoded.email }});
        if (user) {
            req.user = { id: user.id };
            next();
        } else {
            throw { name: 'PleaseLogin' }
        }
    }
    catch(err) { next (err) }
}

const authorize = async (req, res, next) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id }})
        if (task && task.UserId === req.user.id) {
            next();
        } else {
            throw { name: 'Unauthorized' }
        }
    }
    catch(err) { next(err) }
}

module.exports = { authenticate, authorize };