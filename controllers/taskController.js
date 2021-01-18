const { Task } = require('../models')

class TaskController {

    static getTaskHandler(req, res, next) {

        Task.findAll()
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static postTaskHandler(req, res, next) {

        const { name, description } = req.body

        Task.create({
            name,
            description,
            UserId: req.user.id
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static patchTaskHandler(req, res, next) {
        let id = req.params.id
        let { CategoryId } = req.body

        Task.update(req.body, {
            where: {
                id
            }, returning: true
        })
        .then(data => {
            // console.log(data)
            if(data[0] === 0) {
                next({name: "NotFound"})
            } else {
                res.status(201).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static putTaskHandler(req, res, next) {
        let id = req.params.id
        let { name, description } = req.body

        Task.update(req.body, {
            where: {
                id
            }, returning: true
        })
            .then(data => {
                // console.log(data)
                if(data[0] === 0) {
                    next({name: "NotFound"})
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTaskHandler(req, res, next) {
        let id = req.params.id

        Task.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({message: "Delete Category success"})
            })
            .catch(err => {
                next(err)
            })
    }
}


module.exports = TaskController