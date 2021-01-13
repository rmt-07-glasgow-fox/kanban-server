const { Organisation } = require('../models');

const isAuthorizeOrganisation = async(req, res, next) => {
    try {
        const organisation = await Organisation.findByPk(req.params.id);

        if (!organisation || req.user.id !== organisation.ownerId) return next({ name: 'unauthorize' });

        return next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAuthorizeOrganisation