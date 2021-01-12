const { Task } = require('../models')

class TaskController {
    static create(req, res, next) {
        const { title, category } = req.body
        const UserId = req.UserData.id
        Task.create({ title, category, UserId })
            .then(newTask => {
                const { id, title, category, UserId } = newTask
                res.status(201).json({ id, title, category, UserId })
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Task.findAll()
            .then(taskList => {
                res.status(200).json(taskList)
            })
            .catch(err => {
                next(err)
            })        
    }

    static findByPk(req, res, next) {
        const id = +req.params.id
        Task.findByPk(id)
            .then(task => {
                task ? res.status(200).json(task) :
                next({ name: 'NotFoundError' })
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const id = +req.params.id
        const { title, category } = req.body
        Task.update({ title, category }, {
                where: { id },
                returning: true
            })
            .then(taskUpdated => {
                const { id, title, category, UserId } = taskUpdated[1][0].dataValues
                res.status(200).json({ id, title, category, UserId })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCategory(req, res, next) {
        const id = +req.params.id
        const { category } = req.body
        !category ? next({ name: 'CustomError', statusCode: 400, message: 'Category cannot be empty!' }) :
        Task.update({ category }, {
                where: { id },
                returning: true
            })
            .then(taskUpdated => {
                const { id, category } = taskUpdated[1][0].dataValues
                res.status(200).json({ id, category })
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        const id = +req.params.id
        Task.destroy({
                where: { id },
                returning: true
            })
            .then(task => {
                task ? 
                    res.status(200).json({ message: 'Success deleted!' }) :
                    next({name: 'NotFoundError'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController