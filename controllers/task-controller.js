const { Task, Category } = require('../models')

class TaskController {
      static createTask(req, res, next) {
            let newTask = {
                 title: req.body.title,
                 CategoryId: +req.body.CategoryId,
                 UserId: req.user.id
            }
            Task.create(newTask)
                  .then(task => {
                      
                      res.status(201).json(task)
                  }).catch(err => {
                      
                      res.status(500).json(err)
                  })
            
      }

      static getTask(req, res, next) {

            Task.findAll({include: [Category]})
                  .then(data => {
                      res.status(200).json(data)
                  }).catch(err => {
                      res.status(500).json(err)
                  })
            
      }

      static updateTask(req, res, next) {
            let task = {
                  title: req.body.title,
                  CategoryId: req.body.CategoryId,
             }

             let { id } = req.params

             Task.update(task, {where: {id}})
                 .then(data => {
                     
                      return Task.findOne({where: {id}})
                  }).then(task => {
                      res.status(200).json(task)
                  }).catch(err => {
                      res.status(500).json(err)
                  })

      }

      static deleteTask(req, res, next) {
            let id = req.params.id

            Task.destroy({where: {id}})
                  .then(data => {
                     res.status(200).json({message: "task deleted successfully"})
                  }).catch(err => {
                     res.status(500).json(err)
                  })
            
      }
}

module.exports = TaskController