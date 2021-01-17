const { task } = require('../models')

class taskController {
   static getAll(req, res, next) {
      task.findAll()
         .then(taskData => {
            res.status(200).json({ tasks: taskData })
         })
         .catch(err => {
            next(err)
         })
   }

   static create(req, res, next) {
      let newTask = {
         title: req.body.title,
         description: req.body.description,
         category: req.body.category,
         UserId: req.user.id
      }
      task.create(newTask)
         .then(taskData => {
            res.status(201).json({ task: taskData })
         })
         .catch(err => {
            next(err)
         })
   }

   static searchOne(req, res, next) {
      let id = +req.params.id

      task.findByPk(id)
         .then(taskData => {
            res.status(200).json({ task: taskData })
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {
      let id = +req.params.id
      let updatetask = {
         title: req.body.title,
         description: req.body.description,
         category: req.body.category,
      }

      task.update(updatetask, {
         where: {
            id: id
         }
      })
         .then(taskData => {
            if (taskData) {
               res.status(200).json({ message: 'Task has been updated' })
            } else {
               next({ name: 'DataNotFound', msg: 'Data Not Found' })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static updateCategory(req, res, next) {
      let id = +req.params.id
      let taskCategory = {
         category: req.body.category,
      }

      task.update(taskCategory, {
         where: {
            id: id
         }
      })
         .then(taskData => {
            if (taskData) {
               res.status(200).json({ message: 'Task category has been updated' })
            } else {
               next({ name: 'DataNotFound', msg: 'Data Not Found' })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static delete(req, res, next) {
      let id = +req.params.id

      task.destroy({
         where: {
            id: id
         }
      })
         .then(taskData => {
            if (taskData) {
               res.status(200).json({ msg: 'Task success to deleted' })
            } else {
               next({ name: 'DataNotFound', msg: 'Data Not Found' })
            }
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = taskController