const { Task, User }   = require('../models')

class TaskController {
  static async get(req, res, next) {
    try {
      const tasks = await Task.findAll({
        include: {
        model: User,
        attributes:['username']
        } 
      })
      return res.status(200).json(tasks)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async create(req, res, next) {
    const { title, category, description } = req.body
    try {
      const newTask = await Task.create({
        title,
        category,
        description,
        UserId: req.user.id
      })
      const response = {
        id: newTask.id,
        title: newTask.title,
        category: newTask.category,
        description: newTask.description,
        UserId: newTask.UserId
      }
      return res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async updateAll(req, res, next) {
    const id = +req.params.id
    const { title, category, description } = req.body
    try {
      const taskToUpdate = await Task.update({
        title,
        category,
        description
      },
      {where: { id }, returning: true})
      const response = taskToUpdate[1][0]
      return res.status(200).json(response)
    } catch (err) {
        next(err)
    }
  }

  static async update(req, res, next) {
    const id = +req.params.id
    const { category } = req.body
    try {
      const taskToUpdate = await Task.update({
        category
      },
      {where: { id }, returning: true})
      const response = taskToUpdate[1][0]
      return res.status(200).json(response)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async delete(req, res, next) {
    let id = +req.params.id
    try {
      const deletedTask = await Task.findByPk(id)
      await Task.destroy({where: { id }})
      return res.status(200).json({message: 'Task success to delete'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController