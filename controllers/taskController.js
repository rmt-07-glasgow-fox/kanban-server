const { User, Task, Category } = require('../models/index')

class Controller {
    static showTask(req, res, next)  {
        Task.findAll({
            include: [Category, User],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next()
        })
    }

    static addTask(req, res, next)  {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            asignTo: req.body.asignTo,
            categoryId: 1,
            userId: +req.user.id
        }
        Task.create(newData)
        .then(data => {
            let showData = {
                title: data.title,
                description: data.description,
                asignTo: data.asignTo,
                categoryId: data.categoryId
            }
            res.status(201).json(showData)
        })
        .catch(err => {
            next()
        })
    }

    static updateTask(req, res, next)  {
        let condition  = {
            where: {
                id: +req.params.taskId
            }
        }
        let newData = {
            title: req.body.title,
            description: req.body.description,
            asignTo: req.body.asignTo,
            categoryId: req.body.categoryId
        }
        console.log(newData, "ini data update");
        Task.update(newData, condition)
        .then(data => {
            return Task.findByPk(+req.params.id)
        })
        .then(data  => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateStatus(req, res, next) {
        let condition  = {
            where: {
                id: +req.params.taskId
            }
        }
        let newData = {
            categoryId: req.body.categoryId
        }
        Task.update(newData, condition)
        .then(data => {
            return Task.findByPk(+req.params.id)
        })
        .then(data  => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res, next)  {
        let condition = {
            where: {
                id: +req.params.taskId
            }
        }
        Task.destroy(condition)
        .then(data  => {
            res.status(200).json({message: 'success'})
        })
        .catch(err => {
            next()        
        })
    }    
}

module.exports = Controller