const { Task } = require('../models')
const axios = require("axios")

class taskController {

    static createTask(req, res, next) {
        const newTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.user.id
        }

        Task.create(newTask)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let temp = err.errors.map(el => el.message)
                    next({
                        message: temp,
                        code: 400,
                        from: 'create task'
                    })
                } else {
                    next({
                        message: err.message,
                        code: 500,
                        from: 'create task'
                    })
                }
            })

    }

    static getTask(req, res, next) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next({
                    message: err.message,
                    code: 500,
                    from: 'get task'
                })
            })
    }

    static getTaskById(req, res, next) {
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'data not found',
                        code: 404,
                        from: 'get task by id'
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'get task by id'
                })
            })
    }

    static editTask(req, res, next) {
        const dataTask = {
            title: req.body.title,
            category: req.body.category
        }

        Task.update(dataTask, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                        from: 'update task'
                    })
                } else {
                    res.status(200).json({ message: "data updated!" })
                }
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let temp = err.errors.map(el => el.message)
                    next({
                        message: temp,
                        code: 400,
                        from: 'update task'
                    })
                } else {
                    next({
                        message: err.message,
                        code: 500,
                        from: 'update task'
                    })
                }
            })
    }

    static deleteTask(req, res, next) {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: "data not found",
                        code: 404,
                        from: 'change status task'
                    })
                } else {
                    res.status(200).json({ message: "task success to delete" })
                }
            })
            .catch(err => {
                next({
                    message: err.message,
                    code: 500,
                    from: 'update task'
                })
            })
    }
}


module.exports = taskController