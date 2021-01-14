const { Task } = require('../models')

class TaskController{
    static getTask(req,res,next){
        Task.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static addTask(req, res, next){
        const newTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.user.id
        }
        Task.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static deleteTask(req,res,next){
        console.log('ini request nya');
        Task.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(() => {
            res.status(200).json({message: 'Task has been deleted'})
        })
        .catch(err => {
            next(err)
        })
    }
    static editTask(req,res,next){
        const newTask = {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(newTask, {
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Task has been updated' })
        })
        .catch(err => {
            next(err)
        })
    }
    static editOne(req,res,next){
        const newTask = {
            category: req.body.category
        }
        Task.update(newTask, {
            where:{
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Task has been updated' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = {TaskController}