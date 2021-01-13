const { Task } = require('../models')

class TaskController {
  static addTask(req, res, next){
    Task.create({
      title: req.body.title || '',
      category: req.body.category || '',
      UserId: req.userData.id
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getAllTasks(req, res, next){
    Task.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getTaskById(req, res, next){
    Task.findByPk(req.params.id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController