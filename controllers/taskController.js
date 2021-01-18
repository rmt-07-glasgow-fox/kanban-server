const { Task, User } = require('../models')

class taskController {
    static getTask(req, res, next){
        Task.findAll({
            include : User,
            order : ['id']
        })
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            next(err)
        })
    }

    static addTask(req, res, next){
        const task = {
            title : req.body.title,
            category : "Back-Log",
            UserId : req.user.id
        }
        Task.create(task)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            next(err)
        })
    }

    static editTask(req, res, next){
        const taskId =  +req.params.id
        const category = req.body.category
        const edittedTask = {
            category
        }
        Task.update(edittedTask, {
            where : {
                id : taskId
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Task.findOne({
                    where : {
                        id : taskId
                    }
                })
            }
        })
        .then(updatedTask => {
            res.status(200).json(updatedTask)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneTask(req, res, next){
        const taskId = +req.params.id
        Task.findOne({
            where : {
                UserId : req.user.id,
                id : taskId
            }
        })
        .then(data => {
            if(data === null){
                next({name : "Not found"})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static editOneTask(req, res, next){
        let taskID = +req.params.id
        const newTodo = {
            title: req.body.title,
        }
        Task.update(newTodo,{
            where : {
                id : taskID
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Task.findOne({
                    where : {
                        id : taskID
                    }
                })
            }
        })
        .then(editedTask => {
            res.status(200).json(editedTask)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res, next){
        const taskId = req.params.id
        Task.destroy({
            where : {
                id : taskId
            }
        })
        .then(task => {
            if(task === 1){
                res.status(200).json({message : "Task have been deleted"})
            } 
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = taskController