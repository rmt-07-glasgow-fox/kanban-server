const { response } = require('express')
const {Task} = require('../models')

class TaskController {

    static readTask(req, res, next) {
        Task.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static addTask(req, res, next) {
        let taskData = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.loggedInUser.id
        }

        Task.create(taskData)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res, next) {
        let taskId = req.params.id
        Task
            .destroy({where : {
                id: taskId
            }})
            .then(result => {
                res.status(200).json('to do success to delete')
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTask(req, res, next) {
        let taskId = req.params.id
        let taskData = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.loggedInUser.id
        }

        Task.update(taskData, {
            where: {
                id: taskId
            }
        })
        .then(result => {
            res.status(200).json(result, 'Sucessfully updated')
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TaskController