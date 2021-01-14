const { User, Task } = require('../models/index')
const { hashPassword, checkPassword} = require('../helpers/bcrypt')
const { generateToken, checkToken } = require('../helpers/jwt')

class Controller {
  static createTasks(req, res, next) {
    let { title, category } = req.body

    let input = {
      title,
      category,
      UserId: +req.user.id
    }

    Task.create(input, {
      returning: true
    })
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static showTasks(req, res, next) {
    Task.findAll()
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static showTasksById(req, res, next) {
    let taskId = +req.params.id

    Task.findByPk(taskId)
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }

  static patchTasksById(req, res, next) {
    let taskId = +req.params.id
    let category = req.body.category

    // by default, update only returns 1 if success, 0 if not success
    Task.update({category}, {
      where: {id: taskId},
      returning: true
    })
    .then((data) => {
      res.status(200).json({
        message: 'Task moved successfully',
        previous: category,
        updated: data[1][0].category
      })
    })
    .catch((err) => {
      next(err)
    })
  }

  static deleteTasksById(req, res, next) {
    let taskId = +req.params.id

    Task.destroy({
      where: {id: taskId}
    })
    .then(() => {
      res.status(200).json({message: "Task deleted successfully!"})
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = Controller