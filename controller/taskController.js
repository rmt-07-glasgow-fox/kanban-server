const { Task, User } = require('../models')

class TaskController {
  static async showAll(req,res,next){
    try {
      const tasks = await Task.findAll({
        order: [[`id`]],
        include: [User]
      })
      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { title, category } = req.body
      const input = {
        title : title || '',
        category : category || '',
        UserId
      }
      const task = await Task.create(input)
      res.status(201).json(task)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const {id} = req.params
      const tasks = await Task.findOne({
        where: {id},
        include: [User]
      })
      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const { id } = req.params
      const { title, category } = req.body
      const UserId = req.user.id
      const input = {
        title : title || '',
        category : category || '',
        UserId
      }
      const task = await Task.update(input, {
        where : {id},
        returning: true
      })
      if(task){
        res.status(200).json(task[1])
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateCategory(req,res,next){
    try {
      const { id } = req.params
      const { category } = req.body
      const task = await Task.update({category},{
        where: {id},
        returning: true
      })
      if(task){
        res.status(200).json(task[1])
      }
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const task = await Task.destroy({
        where: {id}
      })
      if(task){
        res.status(200).json({
          message: 'task deleted successfull'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController