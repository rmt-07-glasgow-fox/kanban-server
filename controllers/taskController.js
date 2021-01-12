const {
  User,
  Task,
  Category
} = require("../models")

class TaskController {
  static createTask(req, res, next) {
    let { title, categoryId } = req.body
    let userId = req.user.id
    Task.create({ title, userId, categoryId })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static createCategory(req, res, next) {
    let { name } = req.body
    Category.create({ name })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getAllTask(req, res, next) {
    let output
    Category.findAll({
      include: Task,
      order: [["id", "ASC"], [Task, "createdAt", "ASC"]]
    })
    .then(data => {
      output = data
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getOneTask(req, res, next) {
    let id = req.params.id
    Task.findByPk(id)
    .then(data=> {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateOneTask(req, res, next) {
    let id = req.params.id
    let { title } = req.body
    Task.update({title}, {
      where: {
        id
      }
    })
    .then(data=> {
      res.status(200).json({
        message: "Task successfuly edited"
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteOneTask(req, res, next) {
    let id = req.params.id
    Task.destroy({
      where: { id }
    })
    .then(data=> {
      res.status(200).json({
        message: "Task successfuly deleted"
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TaskController
