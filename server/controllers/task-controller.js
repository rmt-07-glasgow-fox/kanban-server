const { Task } = require('../models')
const { generalStampz } = require('../helpers/format-date')

class Controller {
    static showTask(req, res, next) {
        Task.findAll({
            attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller task: show all task'
                })
            })
    }

    static createTask(req, res, next) {
        const task = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            due_date: generalStampz(req.body.due_date),
            user_id: req.userId
        }

        Task.create(task)
            .then(data => {
                const sent = {
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    due_date: data.due_date
                }

                res.status(201).json(sent)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller task: create task'
                })
            })
    }

    static editTask(req, res, next) {
        const id = req.params.id

        Task.findOne({
            where: { id },
            returning: true
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Task: update task'
                    })
                }

                const task = {
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    due_date: generalStampz(req.body.due_date),
                    user_id: req.userId
                }

                return Task.update(task, {
                    where: { id },
                    returning: true
                })

            })
            .then(data => {
                const sent = {
                    title: data[1][0].title,
                    category: data[1][0].category,
                    description: data[1][0].description,
                    due_date: data[1][0].due_date
                }

                res.status(200).json(sent)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller task: edit task'
                })
            })
    }

    static showOne(req, res, next) {
        const id = req.params.id

        Task.findOne({
            where: { id }
        })
            .then(data => {
                const sent = {
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    due_date: data.due_date
                }

                res.status(200).json(sent)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller task: show one task'
                })
            })
    }

    static changeCategory(req, res, next) {
        const id = req.params.id

        Task.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Task: change category task'
                    })
                }

                const task = {
                    category: req.body.category
                }

                console.log(task)

                return Task.update(task, {
                    where: { id },
                    returning: true
                })

            })
            .then(data => {
                const sent = {
                    title: data[1][0].title,
                    category: data[1][0].category,
                    description: data[1][0].description,
                    due_date: data[1][0].due_date
                }

                res.status(200).json(sent)
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller Task: change category task'
                })
            })
    }

    static deleteTask(req, res, next) {
        const id = req.params.id

        Task.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    next({
                        message: 'Item not found',
                        code: 404,
                        from: 'Controller Todo: delete todos'
                    })
                }

                return Task.destroy({
                    where: { id }
                })
            })
            .then(data => {
                res.status(200).json({ message: 'Task successfully deleted' })
            })
            .catch(err => {
                next({
                    message: 'Internal server error',
                    code: 500,
                    from: 'Controller Task: delete task'
                })
            })
    }
}

module.exports = Controller