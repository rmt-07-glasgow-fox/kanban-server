const { Todo } = require('../models/')

class TaskController {
    static getAllTasks(req, res, next) {
        Task.findAll()
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTaskDescription(req, res, next) {
        const taskId = +req.params.id
        const userId = req.user.id
        Task.findOne({
            where: {
                id: taskId
            }
        })
            .then(currentTask => {

            })
    }

    static postTask(req, res, next) {

    }

    static EditTask(req, res, next) {

    }

    static getAllTasks(req, res, next) {

    }

}

module.exports = TaskController
