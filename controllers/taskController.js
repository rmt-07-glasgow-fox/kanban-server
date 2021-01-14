const { Task, User, Category } = require('../models')

class TaskController {
    static async AddTask(req, res, next) {
        try {
            console.log('>>> req.body : ', req.body)

            let title = req.body.title
            let CategoryId = +req.body.CategoryId
            let UserId = +req.user.id

            if (!title || !CategoryId || !UserId) {
                return res.status(400).json({ message: 'title or CategoryId or UserId is required' })
            }

            let data = await Task.create({ title, CategoryId, UserId })
            let response = {
                title: data.title
            }
            // console.log(title, CategoryId, UserId)

            return res.status(200).json(response)
        } catch (err) {
            return next(err)
        }
    }

    static async AllTask(req, res, next) {
        try {
            console.log('task list')

            let data = await Category.findAll({
                order: [['id']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Task,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }]
                }]
            })

            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }

    static async DeleteTask(req, res, next) {
        try {
            let idTask = +req.params.idTask
            console.log('>>> idTask : ', idTask)

            let deleteTask = await Task.destroy({ where: { id: idTask } })
            console.log('>>> deleteTask : ', deleteTask)

            return res.status(200).json({ message: `${req.task.title} is deleted` })
        } catch (err) {
            return next(err)
        }
    }

    static async ChangeCategory(req, res, next) {
        try {
            let idTask = +req.params.idTask
            let CategoryId = +req.params.CategoryId

            let updatedTask = await Task.update({ CategoryId }, {
                where: { id: idTask }
            })
            console.log('>> update ', updatedTask)

            if (updatedTask[0]) {
                let data = await Task.findByPk(idTask, {
                    attributes: { exclude: ['updatedAt', 'createdAt'] }
                })

                return res.status(200).json(data)
            }

            if (!updatedTask[0]) {
                return res.status(400).json({ message: 'gagal update' })
            }

            console.log('update data salah nih')

        } catch (err) {
            return next(err)
        }
    }

    static async EditTask(req, res, next) {
        try {
            let idTask = +req.params.idTask
            let CategoryId = +req.params.CategoryId
            let title = req.body.title
            let UserId = +req.user.id

            if (!title) {
                return res.status(400).json({ message: 'title is required' })
            }

            let updatedTask = await Task.update({ title, CategoryId, UserId }, {
                where: { id: idTask }
            })
            console.log('>> update ', updatedTask)

            if (updatedTask[0]) {
                let data = await Task.findByPk(idTask, {
                    attributes: { exclude: ['updatedAt', 'createdAt'] }
                })

                return res.status(200).json(data)
            }

            if (!updatedTask[0]) {
                return res.status(400).json({ message: 'gagal update' })
            }

            console.log('update data salah nih')
            // return res.status(200).json({ idTask, title, CategoryId, UserId })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TaskController