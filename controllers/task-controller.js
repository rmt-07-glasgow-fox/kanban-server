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
                      if(task.title === ''|| task.CategoryId === ''){
                          task.title = null,
                          task.CategoryId = null
                      }
                      res.status(201).json(task)
                  }).catch(err => {
                     next({name: "SequelizeValidationError"})
                      next(err)
                  })
            
      }

      static getTask(req, res, next) {

            Task.findAll({include: [Category]})
                  .then(data => {
                      res.status(200).json(data)
                  }).catch(err => {
                      next(err)
                  })
            
      }

      static getOne(req, res, next) {
          let { id } = req.params

        Task.findOne({where: {id}})
             .then(task => {
                 res.status(200).json(task)
             }).catch(err => {
                 next({name: "SourceNotFound"})
                 next(err)
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
                    next({name: 'Unauthorized'})
                    next({name:"SequelizeValidationError"})
                    next({name: "SourceNotFound"})
                    next(err)
                  })

      }

      static patchTask(req, res, next){
          let patch = {
              CategoryId: req.body.CategoryId
          }
             let { id } = req.params
          Task.update(patch, {where: {id}})
               .then(data => {
                     return Task.findOne({where: {id}})
               }).then(task => {
                      res.status(200).json(task)
               }).catch(err => {
                next({name: 'Unauthorized'})
                next({name:"SequelizeValidationError"})
                next({name: "SourceNotFound"})
                next(err)
               })
      }

      static deleteTask(req, res, next) {
            let id = req.params.id

            Task.destroy({where: {id}})
                  .then(data => {
                     res.status(200).json({message: "task deleted successfully"})
                  }).catch(err => {
                     next({name: 'Unauthorized'})
                     next({name:"SequelizeValidationError"})
                    next(err)
                  })
            
      }

      static getCategory(req, res, next) {
          Category.findAll()
                    .then(category => {
                        res.status(200).json(category)
                    }).catch(err => {
                        next(err)
                    })
      }
}

module.exports = TaskController