const { Task } = require('../models')

class TaskController {
  static showTasks(req, res, next) {
    Task.findAll({ order: [['id', 'ASC']] })
      .then(task => {
        return res.status(200).json(task)
      })
      .catch(err => {
        next(err)
      })
  }

  static createTask(req, res, next) {
    const UserId = +req.user.id
    const { title, category, importance } = req.body
    const newTask = { title, category, importance, UserId }
   
    Task.create(newTask)
      .then(task => {
        return res.status(201).json(task)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTask(req, res, next) {
    const id = +req.params.id
    const { title, category, importance } = req.body
    const updatedTask = { title, category, importance }

    Task.update(updatedTask, {
       where: { id }, 
       returning: true, plain: true 
    })
      .then(task => {
        if (!task) {
          console.log('sini')
          next({ name:  'accessDenied' })
        }
        return res.status(200).json(task[1])
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static updateCategory(req, res, next) {
    const id = +req.params.id
    const category = { category: req.body.category }
    console.log(category)

    Task.update(category, {
      where: {id}, 
      returning:true, plain:true
    })
      .then(task => {
        if (!task) {
          next({ name:  'resourceNotFound' })
        }
        return res.status(200).json(task[1])
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static destroyTask(req, res, next) {
    const id = +req.params.id

    Task.destroy({ where: { id } })
      .then(task => {
        if (!task) {
          next({ name: 'resourceNotFound' })
        }
        return res.status(200).json({ message: 'Task succesfully deleted'})
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController
