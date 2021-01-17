const { Task, UserTask, User } = require('../models')

class Controller {
    static async createTask(req, res, next) {
        try {
            const { title, description, dueDate, status } = req.body.value
            const addedTask = await Task.create({
                title, description, dueDate, status
            })
            const temp = await UserTask.create({
                UserId: req.user.id,
                TaskId: addedTask.id,
                dueDate: addedTask.dueDate
            })
            res.status(200).json(addedTask)
        } catch (err) {
            next(err)
        }
    }

    static async readTask(req, res, next) {
        try {
            const readTask = await UserTask.findAll({
                include: [User, Task]
            })
            res.status(200).json(readTask)

        } catch (err) {
            next(err)
        }
    }

    static async putTask(req, res, next) {
        try {
            const { title, description, dueDate, status } = req.body.data
            const putTask = await Task.update({
                title, description, dueDate, status
            },
                {
                    where: {
                        id: +req.params.id
                    }
                })
            if (!putTask) {
                next({ name: "ResourceNotFound" })
            } else {
                res.status(200).json({ message: "Task Updated" })
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteTask(req, res, next) {
        try {
            const deletedConjunction = await UserTask.destroy({
                where: {
                    TaskId: +req.params.id
                }
            })
            if (!deletedConjunction) {
                next({ name: "ResourceNotFound" })
            }
            const deletedTask = await Task.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if (!deletedTask) {
                next({ name: "ResourceNotFound" })
            } else {
                res.status(200).json({ message: "Task Deleted" })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller