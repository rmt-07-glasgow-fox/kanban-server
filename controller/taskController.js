const { task } = require('../models/index')

class taskController {
   static getAll (req, res, next) {
      task.findAll()
      .then(taskData => {
         res.status(200).json({task : taskData})
      })
      .catch(err => {
         next(err)
      })
   }

   static create (req, res, next) {
      let newTask = {
         title: req.body.title,
         description: req.body.description,
         category: req.body.category,
         UserId: req.usur.id
      }
      task.create(newTask)
      .then(taskData => {
         res.status(201).json({task: taskData})
      })
      .catch(err => {
         next(err)
      })
   }
}

module.exports = taskController