const { Task, Organisation, Category, User } = require('../models');

class TaskController {
    static async getAll(req, res, next) {
        try {
            const task = await Task.findAll({
                order: [
                    ['createdAt', 'asc']
                ],
                include: [{
                    model: Organisation,
                    as: 'organisation',
                    attributes: ['name']
                }, {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }, {
                    model: User,
                    as: 'user',
                    attributes: ['firstName', 'lastName', 'email']
                }]
            });

            return res.status(200).json({
                status: 'success',
                data: task
            })
        } catch (error) {
            return next(error);
        }
    }

    static async get(req, res, next) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id, {
                include: [{
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['name']
                    },
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['name']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstName', 'lastName', 'email']
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!task) next({ name: 'notFound' });

            return res.status(200).json({
                status: 'success',
                data: task
            })
        } catch (error) {
            return next(error);
        }
    }

    static async store(req, res, next) {
        try {
            const { name, description, organisationId, categoryId } = req.body;
            const input = { name, description, organisationId, categoryId, userId: req.user.id };

            const create = await Task.create(input);

            res.status(201).json({
                status: 'success',
                data: create
            })
        } catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            const input = { name, description };

            const data = await Task.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' });

            await Task.update(input, { where: { id } });
            await data.reload();

            return res.status(200).json({
                status: 'success',
                data
            });

        } catch (error) {
            return next(error);
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const id = req.params.id;
            const { categoryId } = req.body;
            const input = { categoryId };

            const data = await Task.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' });

            await Task.update(input, { where: { id } });
            await data.reload();

            return res.status(200).json({
                status: 'success',
                data
            });
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req, res, next) {
        try {
            const task = await Task.findByPk(req.params.id);

            if (!task) next({ name: 'notFound' });

            task.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'successfully delete task'
            })
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = TaskController