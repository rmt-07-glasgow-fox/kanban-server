const { Kanban, User } = require('../models')

class KanbanController{
    static getAllTask(req, res, next){
        Kanban.findAll({
            include: {
                model: User,
                attributes: ['username']
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getTaskById(req, res, next){
        let taskId = req.params.id
        Kanban.findByPk(taskId, {
            include: {
                model: User,
                attributes: ['username']
            }
        })
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                next({ status: 404 })
            }
        })
        .catch(err => [
            next(err)
        ])
    }

    static addTask(req, res, next){
        let value = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.userData.id
        }
        Kanban.create(value)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.name == "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next(err)
            }
        })
    }

    static putTask(req, res, next){
        let idTask = req.params.id
        let value = {
            title: req.body.title,
            category: req.body.category
        }
        Kanban.update(value, {
            where: {
                id: idTask
            },
            returning: true
        })
        .then(data => {
            if(data){
                res.status(200).json(data[1][0])
            } else {
                next({status: 404})
            }
        })
        .catch(err => {
            if(err.name == "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next(err)
            }
        })
    }

    static patchTask(req, res, next){
        let taskId = req.params.id
        let value = {
            category: req.body.category
        }
        Kanban.update(value, {
            where: {
                id: taskId
            },
            returning: true
        })
        .then(data => {
            if(data){
                res.status(200).json(data[1][0])
            } else {
                next({status: 404})
            }
        })
        .catch(err => {
            if(err.name == "SequelizeValidationError"){
                next({
                    status: 400,
                    errors: err.errors
                })
            } else {
                next(err)
            }
        })
    }

    static deleteTask(req, res, next){
        let taskId = req.params.id
        Kanban.destroy({
            where: {
                id: taskId
            }
        })
        .then(data => {
            if(data) {
                res.status(200).json({
                    message: "Delete task success"
                })
            } else {
                next({status: 404})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = KanbanController