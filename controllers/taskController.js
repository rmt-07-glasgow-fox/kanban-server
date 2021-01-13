const { Task, User } = require('../models');

class TaskController {

    static getTasks = async (req, res, next) => {
        try {
            const tasks = await Task.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: User,
                    attributes: ['name']
                },
                order: [['id', 'ASC']]
            });
            res.status(200).json(tasks);
        }
        catch(err) { next(err) }
    }

    static postTask = async (req, res, next) => {
        const UserId = req.user.id;
        const { title, detail, due_date } = req.body;
        try {
            const task = await Task.create({ title, detail, due_date, UserId });
            res.status(201).json(task);
        }
        catch(err) { next(err) }
    }

    static getTask = async (req, res, next) => {
        const id = req.params.id;
        try {
            const task = await Task.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (task) {
                res.status(200).json(task);
            } else {
                throw { name: 'NotFound' }
            }
        }
        catch(err) { next(err) }
    }

    static putTask = async (req, res, next) => {
        const id = req.params.id;
        const { title, detail, due_date } = req.body;
        try {
            let task = await Task.update({ title, detail, due_date }, {
                where: { id },
                returning: true
            });
            if (task[0] == 1) {
                res.status(200).json(task[1][0]);  
            } else {
                throw { name: 'NotFound' }
            }
        }
        catch(err) { next(err) }
    }

    static patchTask = async (req, res, next) => {
        const id = req.params.id;
        const { category } = req.body;
        try {
            const task = await Task.update({ category }, {
                where: { id },
                returning: true
            });
            if (task[0] == 1) {
                res.status(200).json(task[1][0]);
            } else {
                throw { name: 'NotFound' }
            }
        }
        catch(err) { next(err) }
    }
    
    static deleteTask = async (req, res, next) => {
        const id = req.params.id;
        try {
            const task = await Task.destroy({
                where: { id }
            });
            if (task == 1) {
                res.status(200).json({
                    message: 'Success, task deleted'
                });
            } else {
                throw { name: 'NotFound' }
            }
        }
        catch(err) { next(err) }
    }
}

module.exports = TaskController;