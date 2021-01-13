const { Task } = require('../models')

module.exports = class TaskController {
    static getTasks(req, res, next) {
        Task.findAll({ 
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static createTask(req, res, next) {
        const newData = {
            title: req.body.title,
            CategoryId: req.body.CategoryId,
            UserId: req.user
        }
        Task.create(newData)
        .then( data => {
            const response = {
                title: data.title,
                CategoryId: data.CategoryId
            }
            return res.status(201).json(response)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static getTask(req, res, next) {
        const getId = +req.params.id
        Task.findByPk(getId, {
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            if (data) {
                return res.status(200).json(data)
            } else {
                next({ name: 'notFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static editTask(req, res, next) {
        const getId = +req.params.id
        const newData = {
            title: req.body.title,
            CategoryId: req.body.CategoryId,
            UserId: req.user
        }
        Task.update(newData, {
            where: {
                id: getId
            }
        })
        .then( data => {
            if (data[0] === 1) {
                return res.status(201).json({ message: "Task has been Updated" })
            } else {
                next({ name: 'notFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static patchTask(req, res, next) {
        const getId = +req.params.id
        const { CategoryId } = req.body
        const newData = {
            CategoryId: CategoryId
        }
        Task.update(newData, {
            where: {
                id: getId
            }
        })
        .then( data => {
            if (data[0] === 1) {
                res.status(201).json({ message: true })
            } else {
                next({ name: 'notFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }

    static deleteTask(req, res, next) {
        const getId = +req.params.id
        Task.destroy( {
            where: {
                id: getId
            }
        } )
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'Task has been Deleted' })
            } else {
                next({ name: 'notFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }
}