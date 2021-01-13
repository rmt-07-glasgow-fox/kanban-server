const { Task } = require('../models')

class TaskController{
    static getTask(req,res){
        Task.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
    }
    static addTask(req,res){
        console.log('>>>>>>>>>>',req.user.id);
        console.log('romi');
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
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
    }
    static deleteTask(req,res){
        Task.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(() => {
            res.status(200).json({message: 'Task has been deleted'})
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
    }
    static editTask(req,res){
        const newTask = {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(newTask)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(405).json({message: 'Wrong data update'})
        })
    }
    static editOne(req,res){
        const newTask = {
            status: req.body.category
        }
        Task.update(newTask)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(405).json({message: 'Wrong data update'})
        })
    }
}

module.exports = {TaskController}