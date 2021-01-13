const { Task } = require('../models');

const isAuthorizeTask = async(req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task || req.user.id !== task.userId) return next({ name: 'unauthorize' });

        return next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAuthorizeTask