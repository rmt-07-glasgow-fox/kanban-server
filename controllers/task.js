const {Task, User} = require('../models')

class TaskController {

    static async list (req, res, next) {
        try {
            const data = await Task.findAll({include: [{model: User}]})
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async createTask (req, res, next) {
        try {
            let data = {
                title: req.body.title,
                category: req.body.category,
                UserId : req.user.id
            }
            const created = await Task.create(data)
            res.status(201).json(created)
        } catch (err) {
            next(err)
        }
    }

    static async taskById (req, res, next) {
        try {
            let id = req.params.id
            const findTask = await Task.findByPk(id)
            if(!findTask) {
                throw {
                    status: 404,
                    message: 'Task not found'
                }
            } else {
                res.status(200).json(findTask)
            }
        } catch (err) {
            next(err)
        }
    }

    static async edited (req, res, next) {
        try {
            let id = req.params.id
            let data = {
                title: req.body.title,
                category: req.body.category
            }
            const findTask = await Task.findByPk(id)
            if(!findTask) {
                throw {
                    status: 404,
                    message: 'Task not found'
                }
            } else {
                const saved = await Task.update(data, {where: {id}, returning: true})
                res.status(200).json(saved[1])
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleted (req, res, next) {
        try {
            let id = req.params.id
            const findTask = await Task.findByPk(id)
            if(!findTask) {
                throw {
                    status: 404,
                    message: 'Task not found'
                }
            } else {
                const deletedTask = await Task.destroy({where: {id}})
                res.status(200).json('Task Deleted')
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController