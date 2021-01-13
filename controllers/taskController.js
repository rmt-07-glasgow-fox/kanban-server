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
                res.status(500).json({message: "Internal Server Error"})
            })
    }

    static putTaskHandler(req, res, next) {
        let id = req.params.id

        Task.update({where: {
            id
        }})
            .then(data => {
                if(data[0] === 0) {
                    res.status(404).json({message: "Not Found"})
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(err => {
                res.status(500).json({message: "Internal Server Error"})
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

            })
            .catch(err => {
                
            })
    }
}


module.exports = TaskController