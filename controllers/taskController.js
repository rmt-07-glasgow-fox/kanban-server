const { Task, User, Organization, Category } = require('../models/index');

class TaskController {
    static async getAll (req, res, next) {
        try {
            let data = await Task.findAll({ include: [User, Organization, Category] });

            res.status(200).json(data);
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async postTask (req, res, next) {
        try {
            let data = {
                userId: req.headers.payload.id,
                orgId: req.params.orgId,
                title: req.body.title,
                categoryId: req.body.categoryId
            };

            data = await Task.create(data);

            data = {
                userId: data.userId,
                orgId: data.orgId,
                title: data.title,
                categoryId: data.categoryId
            };

            res.status(201).json(data);
        } catch (err) {
            console.log(err);
            if (err.errors) {
                return next({ code: 400, errors: err.errors });
            }

            next({ code: 500 });
        }
    }

    static async putTask (req, res, next) {
        try {
            let data = await Task.update({
                title: req.body.title
            }, {
                where: { id: req.params.taskId }
            });
            
            data = await Task.findOne({ where: { id: req.params.taskId } });

            if (!data) {
                return next({ code: 404, msg: `Data with id ${req.params.taskId} not found` });
            }

            res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.errors });
            }

            next({ code: 500 });
        }
    }

    static async patchTask (req, res, next) {
        try {
            let data = await Task.update({
                categoryId: req.body.categoryId
            }, {
                where: { id: req.params.taskId }
            });
            
            data = await Task.findOne({ where: { id: req.params.taskId } });
            
            if (!data) {
                return next({ code: 404, msg: `Data with id ${req.params.taskId} not found` });
            }

            res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.errors });
            }

            next({ code: 500 });
        }
    }

    static async deleteTask (req, res, next) {
        try {
            let data = await Task.destroy({ where: { id: req.params.taskId } });

            res.status(200).json(data);
        } catch (err) {
            next({ code: 500 });
        }
    }
}

module.exports = TaskController;