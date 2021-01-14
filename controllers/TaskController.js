const { Task, Category } = require('../models')

class TaskController {
    static async getTaskList(req, res, next) {
        try {
            let taskList = await Task.findAll({include: [Category]})

            res.status(200).json(taskList)
        } catch (err) {
            next(err)
        }
    }

    static async createNewTask(req, res, next) {
        try {
            let obj = {
                title: req.body.title,
                description: req.body.description,
                UserId: req.user.id
            }
            let newTask = await Task.create(obj)
            res.status(201).json(newTask)
        } catch (err) {
            next(err)
        }
    }

    static async updateTask(req, res, next) {
        try {
            let obj = {
                title: req.body.title,
                description: req.body.description,
                UserId: req.user.id,
                CategoryId: req.body.CategoryId
            }
            let updatedTask = await Task.update(obj, {
                where: {id: +req.params.id},
                returning: true
            })
            res.status(200).json(updatedTask)
        } catch (err) {
            next(err)
        }
    }

    static async deleteTask(req, res, next) {
        try {
            Task.destroy({where: {id: +req.params.id}})
            .then(() => {
                res.status(200).json({message: 'success to delete selected task'})
            })
            .catch(next)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController