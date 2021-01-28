const { Task } = require("../models")

class TaskController {
    static list (req, res, next) {
        Task.findAll ()
        .then (result => {
            return res.status (200).json (result)
        })
        .catch (err => {
            next(err)
        })
    }

    static add (req, res, next) {
        const { title, assign_to, category, description } = req.body
        const UserId = req.user.id
        console.log(req.body)
        console.log(UserId)

        Task.create ({ title, assign_to, category, description, UserId })
        .then (result => {
             return res.status (201).json (result)
        })
        .catch (err => {
            next (err)
        })
    }

    static getOne (req, res, next) {
       const id = +req.params.id

       Task.findByPk (id)
       .then (result => {
            return res.status (200).json(result)
       })
       .catch (err => {
           console.log(err)
            next (err)
       })
    }

    static edit (req, res, next) {
        const { title, description, assign_to } = req.body
        const id = +req.params.id

        Task.update({ title, description, assign_to }, {
            where: {
                id
            }, fields: [ "title", "description", "assign_to" ]
        })
        .then (result => {
            console.log(result[0])
            if (result[0] === 1) {
                res.status (201).json ({ message: 'Succesfully Update Task' })
            } else {
                next ({ name: "ResourceNotFoud" })
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static changeCategory (req, res, next) {
        const id = +req.params.id
        const { category } = req.body

        Task.update ({ category }, {
            where: {
                id
            }, fields: [ "category" ]
        })
        .then (result => {
            if (result[0] === 1) {
                res.status (200).json ({ message: 'Succesfully Update Task' })
            } else {
                next ({ name: "ResourceNotFound" })
            }
        })
        .catch (err => {
            next (err)
        })
    }

    static removeOne (req, res, next) {
        const id = +req.params.id
        console.log(id)

        Task.destroy ({ where: { id }})
        .then (result => {
            console.log(result)
            if (result === 1) {
                res.status (200).json ({ message: "Task Succesfully Deleted" })
            } else {
                next ({ name: "ResourceNotFoud" })
            }
        })
        .catch (err => {
            next(err)
        })
    }

}

module.exports = TaskController