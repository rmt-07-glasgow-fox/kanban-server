const { Task } = require('../models/index')

class TaskController{
  static getAllTask (req, res){
    Task.findAll()
    .then(tasks => {
      res.status(200).json({tasks})
    })
    .catch(err => {
      console.log(err, 'ini error didalam TaskController.getAllTask')
      res.status(500).json({msg: 'internal server error'})
    })
  }

  static createTask (req, res){
    let newTask = {
      title: req.body.title,
      category: req.body.category,
      user_id: req.user.id
    }
    Task.create(newTask)
    .then(task => {
      res.status(200).json(task)
    })
    .catch(err => {
      console.log(err, 'ini error didalam TaskController.createTask')
      res.status(500).json({msg: 'internal server error'})
    })
  }

  static getTaskById (req, res){
    Task.findOne({
      where: {id: req.params.id}
    })
    .then(task => {
      res.status(200).json(task)
    })
    .catch(err => {
      console.log(err, 'ini error didalam TaskController.getTaskById')
      res.status(500).json({msg: 'internal server error'})
    })
  }

  static editTask (req, res){
    let { title, category } = req.body
    Task.update({title, category}, {
      where: {id: req.params.id}
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err, 'ini error didalam TaskController.editTask')
      res.status(500).json({msg: 'internal server error'})
    })
  }

  static updateTask (req, res){
    let { category } = req.body
    Task.update({ category }, {where: {
      id: req.params.id
    }, returning: true})
    .then(results => {
      let result = results[1]
      res.status(200).json({task: result})
    })
    .catch(err => {
      console.log(err, 'ini error didalam TaskController.updateTask')
      res.status(500).json({msg: 'internal server error'})
    })
  }
}

module.exports = TaskController