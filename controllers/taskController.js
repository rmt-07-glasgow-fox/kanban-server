const { Task } = require('../models/')

class TaskController {
    static getAllTasks(req, res, next) {
        Task.findAll()
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTaskDescription(req, res, next) {
        const taskId = +req.params.id
        //const userId = req.user.id
        Task.findOne({
            where: {
                id: taskId
            }
        })
            .then(currentTask => {
                if (!currentTask) {
                    next({ name: "ResourceNotFound" })
                }
                else {
                    res.status(200).json(currentTask)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static postTask(req, res, next) {
        const { title, description, category } = req.body
        const UserId = req.user.id
        Task.create({
            title,
            description,
            category,
            UserId
        })
            .then(createdTask => {
                res.status(201).json({
                    createdTask
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static editTask(req, res, next) {
        const { title, description } = req.body
        const taskId = +req.params.id
        console.log(taskId)

        Task.findByPk(taskId)
            .then(currentTask => {

                return currentTask.update({
                    title,
                    description
                })
            })
            .then(updatedTask => {
                res.status(200).json(updatedTask)
            })
            .catch(err => {
                next(err)
            })
    }

    static changeCategory(req, res, next) {
        const { category } = req.body
        const taskId = +req.params.id

        Task.findOne({
            where: {
                id: taskId
            }
        })
            .then(currentTask => {
                return currentTask.update({
                    category
                })
            })
            .then(changedCategoryTask => {
                res.status(200).json({ category: changedCategoryTask.category })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTask(req, res, next) {
        const taskId = +req.params.id

        Task.destroy({
            where: {
                id: taskId
            }
        })
            .then(result => {
                if (result === 1) {
                    res.status(200).json({ message: "Task successfully deleted." })
                }
                else {
                    next({ name: "ResourceNotFound" })
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = TaskController
