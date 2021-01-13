const { Task } = require('../models')

class TaskController {
    static getAllTask (req,res,next) {
        Task.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static createTask (req,res,next) {
        const obj = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description
        }
        Task.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            next(error)
        })
    }

    static deleteTask (req,res,next) {
        Task.destroy({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json({message: 'task successfully deleted'})
            } else {
                throw {
                    status: 404,
                    message: 'task not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static editCategoryTask (req,res,next) {
        const obj = {
            category: req.body.category
        }
        Task.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {
                    status: 404,
                    message: 'task not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static editTask (req,res,next) {
        const obj = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description
        }
        Task.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {
                    status: 404,
                    message: 'task not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = TaskController