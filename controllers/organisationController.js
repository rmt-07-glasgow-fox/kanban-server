const { Organisation, User, UserOrganisation, Task, Category } = require('../models');

class OrganisationController {
    static async getAll(req, res, next) {
        try {
            const organisation = await User.findAll({
                where: {
                    id: req.user.id
                },
                include: [{
                    model: Organisation,
                    through: UserOrganisation,
                    as: 'organisation',
                    attributes: ['id', 'name'],
                    include: [{
                        model: User,
                        as: 'owner',
                        attributes: ['firstName', 'lastName'],
                    }]
                }],
                attributes: ['email']
            })

            return res.status(200).json({ status: 'sucess', data: organisation[0].organisation })
        } catch (error) {
            return next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const { id } = req.params;
            const organisation = await Organisation.findByPk(id, {
                include: [{
                    model: User,
                    through: UserOrganisation,
                    as: 'user',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }, {
                    model: User,
                    as: 'owner',
                    attributes: ['firstName', 'lastName']
                }],
                attributes: { exclude: ['ownerId', 'createdAt', 'updatedAt'] }
            });

            if (!organisation) return next({ name: 'notFound' });

            return res.status(200).json({
                status: 'success',
                data: organisation
            })
        } catch (error) {
            return next(error)
        }
    }

    static async get(req, res, next) {
        try {
            const { id } = req.params;

            const category = await Category.findAll({
                include: [{
                    model: Task,
                    as: 'task',
                    where: { organisationId: id },
                    required: false,
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['email']
                    }],
                }],
                attributes: { exclude: ['ownerId', 'createdAt', 'updatedAt'] }
            })

            const organisation = await Organisation.findByPk(id, {
                include: [{
                    model: User,
                    as: 'owner',
                    attributes: ['firstName', 'lastName']
                }],
                attributes: { exclude: ['ownerId', 'createdAt', 'updatedAt'] }
            });

            if (!organisation) return next({ name: 'notFound' });

            return res.status(200).json({
                status: 'success',
                data: {
                    category,
                    organisation
                }
            })
        } catch (error) {
            return next(error)
        }
    }

    static async store(req, res, next) {
        try {
            const { name } = req.body;
            const input = { name, ownerId: req.user.id };

            const create = await Organisation.create(input);

            await UserOrganisation.create({
                userId: req.user.id,
                organisationId: create.id
            })

            return res.status(201).json({
                status: 'sucess',
                data: create
            })

        } catch (error) {
            return next(error)
        }
    }

    static async storeUser(req, res, next) {
        try {
            const { id, userId } = req.params;

            const findUser = User.findByPk(userId);
            if (!findUser) return next({ name: 'notFound' });

            const data = await UserOrganisation.create({
                userId: userId,
                organisationId: id
            })

            return res.status(201).json({
                status: 'sucess',
                data
            })
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body;
            const input = { name };

            const organisation = await Organisation.findByPk(id);

            if (!organisation) return next({ name: 'notFound' });

            await organisation.update(input, { where: { id } });
            await organisation.reload();

            return res.status(200).json({
                status: 'success',
                data: organisation
            })

        } catch (error) {
            return next(error)
        }
    }

    static async destroy(req, res, next) {
        try {
            const organisation = await Organisation.findByPk(req.params.id);
            if (!organisation) return next({ name: 'notFound' });
            organisation.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'successfully delete organisation'
            })
        } catch (error) {
            return next(error)
        }
    }

    static async destroyUser(req, res, next) {
        try {
            const { id, userId } = req.params;
            const userOrganisation = await UserOrganisation.findOne({ where: { userId, organisationId: id } })
            if (!userOrganisation) return next({ name: 'notFound' });
            console.log(userId, req.user.id);
            if (req.user.id === +userId) return next({ name: 'deleteSelf' })

            userOrganisation.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'successfully delete user from organisation'
            })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = OrganisationController