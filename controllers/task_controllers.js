const { User, Task } = require('../models')

class TaskController {
    static findTasks(req, res, next) {
        Task.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }

    static findTaskById(req, res, next) {
        let id = req.params.id
        Task.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(data => {
            if (!data) {
                next({message: 'Data Not Found'})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }

    static createTask(req, res, next) {
        const { title, category, description} = req.body
        console.log(req.user.id, 'ini disini')
        const UserId = req.user.id
        let obj = {
            title,
            category,
            UserId,
            description
        }
        console.log(obj)
        Task.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }

    static editTask(req, res, next) {
        let id = req.params.id
        const { title, category, description} = req.body
        let obj = {
            title,
            category,
            description
        }
        Task.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }

    static destroyTask(req, res, next) {
        let id = req.params.id
        Task.destroy({
            where: {
                id
            }
        })
        .then(data => {
            if (!data) {
                next({ message: 'Data Not Found'})
            } else {
                res.status(200).json({message: 'Task Has Been Succesfully Deleted'})
            }
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }

    static changeTaskCategory(req, res, next) {
        let id = req.params.id
        const { category } = req.body
        let obj = {
            category
        }
        Task.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next({message: 'Internal Server Error'})
        })
    }
}

module.exports = { TaskController }