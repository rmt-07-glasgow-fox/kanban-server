const { User, Task } = require('../models');
const timeFormat = require('../helpers/timeFormat');
const updateTask = require('../helpers/updateTask')

class TaskController {
    static getTasks(req, res, next) {
        Task.findAll({
            include: {
                model: User
            }
        })
            .then(tasks => {
                let updatedTasks = tasks.map(task => {
                    let { id, description, category, userId, updatedAt } = task;

                    return {
                        id,
                        description,
                        category,
                        userId,
                        updatedAt: timeFormat(updatedAt),
                        name: task.User.name
                    }
                })
                res.status(200).json(updatedTasks)
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }  

    static addTask(req, res,next) {
        let newTask = {
            description: req.body.description,
            category: req.body.category,
            userId: req.user.userId,
        }

        Task.create(newTask)
            .then(task => {
                let {id, description, category, userId, updatedAt } = task

                res.status(201).json({
                    id,
                    description,
                    category,
                    userId,
                    updatedAt: timeFormat(updatedAt)
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static getTask(req, res, next) {
        let taskId = req.params.id;

        Task.findOne({
            where: {
                id: taskId
            }
        })
            .then(task => {
                if (!task) throw new Error('TaskNotFound')

                let { id, description, category, userId, updatedAt } = task
                res.status(200).json({
                    id, 
                    description,
                    category,
                    userId,
                    updatedAt: timeFormat(updatedAt)
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static editDescription(req, res, next) {
        let taskId = req.params.id;
        let task = {
            description: req.body.description,
        }

        updateTask(Task, task, taskId, res, next);
    }

    static editCategory(req, res,next) {
        let taskId = req.params.id;
        let task = {
            category: req.body.category,
        }

        updateTask(Task, task, taskId, res, next)
    }

    static deleteTask(req, res, next) {
        let id = req.params.id;
        let deletedTask = {};
        
        Task.findOne({
            where: {
                id
            }
        })
            .then(task => {
                deletedTask = task

                return Task.destroy({
                    where: {
                        id: task.id
                    }
                })
            })
            .then(succeed => {
                res.status(200).json(deletedTask)
            })
            .catch(err => {
                next(err)
            })
    }

    // static updateTask(req, res, next, task) {
    //     Task.update(task, {
    //         where: {
    //             id: taskId
    //         },
    //         returning: true,
    //     })
    //         .then(response => {
    //             let succeed = response[0];
    //             let { id, description, category, updatedAt } = response[1][0];

    //             if (!succeed) throw new Error('TaskNotFound')
    //             res.status(200).json({
    //                 id,
    //                 description,
    //                 category,
    //                 updatedAt: moment(updatedAt).format('D MMMM YYYY, h:mm a')
    //             })
    //         })
    //         .catch(err => {
    //             next(err)
    //         })
    // }
}

module.exports = TaskController;