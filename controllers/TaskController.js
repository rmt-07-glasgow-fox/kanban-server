const {Task, User} = require('../models')

class TaskController {
    static show(req,res) {
        Task.findAll({include: [User]})
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }

    static create(req, res) {
        let newTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.user.id
        }
        Task.create(newTask)
            .then(data => res.status(201).json({msg: 'New Task Create'}))
            .catch(err => res.status(500).json({msg: 'Internal Server Error create'}))
    }

    static edit(req, res) {
        let editTask = {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(editTask, {where: {id: req.params.id}})
            .then(taskUpdate => res.status(200).json({editTask}))
            .catch(err => res.status(500).json({msg: 'Internal Server Error update'}))
    }

    static delete(req, res) {
        console.log('masuk delete');
        
        Task.destroy({where: {id: req.params.id}})
            .then(data => res.status(200).json({msg: 'task delete'}))
            .catch(err => res.status(500).json({msg: 'Internal Server Error create'}))
    }

    static getUser(req, res) {
        Task.findByPk(+req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err))
    }
}

module.exports = TaskController