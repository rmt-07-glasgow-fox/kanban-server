const { Task, Category } = require('../models')

class TaskController {
    static getTask (req, res, next) {
        Task.findAll()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            next(err)
        })
    }

    static createTask (req, res, next) {
        let newTask = {
            title: req.body.title,
            CategoryId: req.body.CategoryId,
            UserId : req.user.id
        }
        Task.create(newTask)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            next(err)
        })
    }

    static editCategory (req, res, next){
        let id = +req.params.id
        let { CategoryId } = req.body
        Task.update({ CategoryId }, {where: {id} })
        .then(data => {
            if(data[0] === 0){
                next({name: "resourceNotFound"})
            }else {
                res.status(200).json({message: 'Success Update'})
            }
        })
        .catch(err => {
           next(err)
        })
    }

    static deleteTask (req, res, next) {
        let id = +req.params.id
        Task.destroy({ where : {id} })
        .then(data => {
            if (data === 0){
                next({name: "resourceNotFound"})
            }else {
                res.status(200).json({message: 'Success to Delete'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController