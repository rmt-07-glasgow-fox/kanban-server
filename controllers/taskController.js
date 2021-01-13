const { Task } = require('../models')

class taskController {
  static createTask(req, res, next) {
    const newTask = {
      title: req.body.title,
      category: req.body.category,
      user_id: req.user.id
    }
    Task.create(newTask)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static getTask(req, res, next) {
    Task.findAll({ include: 'User' })
    .then(data => {
      let result = data.map(el => {
        return {
          id: el.id,
          title: el.title,
          category: el.category,
          user_id: el.user_id,
          username: el.User.username,
          email: el.User.email
        }
      })
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }
  static getOneTask(req, res, next) {
    const id = +req.params.id
    Task.findByPk(id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        next({ name: 'notFound' })
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static updateTask(req, res, next) {
    const id = +req.params.id
    const editTask = {
      title: req.body.title,
      category: req.body.category
    }
    Task.update(editTask, {
      where: { id: id },
      returning: true
    })
    .then(data => {
      if(data[0] === 0) {
        next({ name: 'notFound'})
      } else {
        res.status(200).json(data[1][0])
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static modifyTask(req, res, next) {
    const id = +req.params.id
    const editCategory = { category: req.body.category }
    Task.update(editCategory, {
      where: { id: id },
      returning: true
    })
    .then(data => {
      if(data[0] === 0) {
        next({ name: 'notFound'})
      } else {
        res.status(200).json(data[1][0])
      }
    })
    .catch(err => {
      next(err)
    })
  }
  static deleteTask(req, res, next) {
    const id = +req.params.id
    Task.destroy({
      where: { id: id }
    })
    .then(data => {
      if(data === 1) {
        res.status(200).json({
          message: 'Task success to delete'
        })
      } else {
        next({ name: 'notFound'})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = taskController