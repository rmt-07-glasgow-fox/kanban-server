const { Task } = require('../models')

class TaskController {
    static addTask(req, res, next) {
        let input = {
            title: req.body.title, 
            category: req.body.category, 
            UserId: req.UserId
        }
        Task.create(input)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static getAllTasks(req, res, next) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static updateTask(req, res, next) {
        let id = req.params.id
        let input = {
            title: req.body.title, 
            category: req.body.category
        }
        Task.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Not Found'})
                } else {
                    return Task.update(input, {
                        where: { id },
                        returning: true
                    })
                }
            })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(next)
    }

    static deleteById(req, res, next) {
        let id = req.params.id
        Task.destroy({
            where: { id }
        })
            .then(result => {
                if (result == '0') {
                    next({ name: 'Not Found'})
                } else {
                    res.status(200).json({ message: 'Task has been deleted'})
                }
            })
            .catch(next)
    }
}

module.exports = TaskController