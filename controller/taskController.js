const { Task, User, Category } = require('../models')

class TaskController {
  static async showAll(req,res,next){
    try {
      const tasks = await Task.findAll({
        order: [[`id`]],
        include: [User, Category]
      })
      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const UserId = req.user.id
      const { title, CategoryId } = req.body
      const input = {
        title : title || '',
        CategoryId : CategoryId || '',
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
        include: [User, Category]
      })
      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const { id } = req.params
      const { title, CategoryId } = req.body
      const UserId = req.user.id
      const input = {
        title : title || '',
        CategoryId : CategoryId || '',
        UserId
      }
      const task = await Task.update(input, {
        where : {id},
        returning: true
      })
      if(task){
        res.status(200).json(task[1][0])
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateCategory(req,res,next){
    try {
      const { id } = req.params
      const { CategoryId } = req.body
      const task = await Task.update({CategoryId},{
        where: {id},
        returning: true
      })
      if(task){
        res.status(200).json(task[1][0])
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