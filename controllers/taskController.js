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
      console.log(err.message);
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
    Task.findAll({
      order: [["id", "ASC"]]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getAllCategory(req, res, next) {
    Category.findAll({
      include: [{model:Task, include:[{model:User}]}],
      order: [["id", "ASC"], [Task, "createdAt", "ASC"]]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }

  static getOneTask(req, res, next) {
    let id = req.params.id
    Task.findByPk(id, {
      include: Task
    })
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

  static changeTaskCategory(req, res, next) {
    let { categoryId } = req.body
    let id = req.params.id
    Task.findByPk(id)
    .then(data => {
      if (!data) {
        next({name: "resourceNotFound"})
      } else {
        data.categoryId = categoryId
        return data.save()
      }
    })
    .then(data => {
      res.status(200).json(data)
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

  static deleteCategory(req, res, next) {
    let id = req.params.id
    Category.findByPk(id, {
      include: Task,
    })
    .then(data=> {
      if (data.Tasks.length == 0) {
        return Category.destroy({
          where: {
            id
          }
        })
      } else {
        return next({
          name: "CannotDelete"
        })
      }
    })
    .then(data => {
      if (data == 1) {
        return res.status(200).json({
          message: "Categories successfuly deleted"
        })
      } else {
        return next({
          name: "CannotDelete"
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TaskController
