const { Task } = require('../models')

class TaskController {
    static async AddTask(req, res, next) {
        try {
            // let { title, CategoryId } = req.body

            return res.status(200).json({ message: req.body })
        } catch (err) {
            return next(err)
        }
    }

    static async UserTask(req, res, next) {
        try {
            return res.status(200).json({ message: req.body })
        } catch (err) {
            return next(err)
        }
    }

    static async DeleteTask(req, res, next) {
        try {
            let { idTask } = req.params
            if (!idTask) {
                return res.status(400).json({ message: 'Id Task Gak ada' })
            }

            return res.status(200).json({ message: req.body })
        } catch (err) {
            return next(err)
        }
    }

    static async EditTask(req, res, next) {
        try {
            let { idTask, CategoryId } = req.params
            let { title } = req.body

            if (!idTask || !CategoryId || !title) {
                return next({ name: '400' })
            }

            return res.status(200).json({ message: req.body })
        } catch (err) {
            return next(err)
        }
    }

    static async UpdateCategoryTask(req, res, next) {
        try {
            return res.status(200).json({ message: req.body })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TaskController