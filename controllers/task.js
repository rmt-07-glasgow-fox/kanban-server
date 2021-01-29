const { User, Task } = require('../models')

class Controller {

  static createTask(req, res, next) {
    let { title, description } = req.body
    let input = {
      title,
      description,
      status: 'backlog',
      UserId: req.user.id
    }

    Task.create(input)
      .then( result => {
        let { title, description, status } = result
        let task = { title, description, status }

        res.status(201).json(task)
      })
      .catch( err => {
        next(err)
      })
  }

  static getTasks(req, res, next) {
    Task.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        }
      }
    })
      .then( tasks => {
        res.status(200).json(tasks)
      })
      .catch( err => {
        next(err)
      })
  }

  static getTaskById(req, res, next) {
    let id = req.params.id
    Task.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        }
      }
    })
      .then( task => {
        if (task) {
          res.status(200).json(task)
        } else {
          next({ name: 'NotFound' })
        }
      })
      .catch( err => {
        next(err)
      })
  }

  static putTaskById(req, res, next) {
    let id = req.params.id
    let { title, description, status } = req.body

    Task.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then( task => {
        if (task) {
          task.title = title
          task.description = description
          task.status = status
          return task.save()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( newTask => {
        res.status(200).json(newTask)
      })
      .catch( err => {
        next(err)
      })
  }

  static updateTaskStatus(req, res, next) {
    let id = req.params.id
    let status = req.body.status

    Task.findByPk(id)
      .then( task => {
        if(task) {
          task.status = status
          return task.save()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( task => {
        res.status(200).json(task)
      })
      .catch( err => {
        next(err)
      })
  }

  static deleteTaskById(req, res, next) {
    let id = req.params.id

    Task.findByPk(id)
      .then( task => {
        if(task) {
          return task.destroy()
        } else {
          next({ name: 'NotFound' })
        }
      })
      .then( result => {
        res.status(200).json({ message: 'task success to delete' })
      })
      .catch( err => {
        next(err)
      })
  }
}

module.exports = Controller
