const { Task, Category, User } = require('../models')

class TaskController {

  static async create(req, res, next) {
    try {
      let { name, CategoryId } = req.body
      let taskObj = {
        name: name,
        CategoryId: CategoryId,
        UserId: req.currentUser.id
      }
      let task = await Task.create(taskObj)
      res.status(201).json(task)
    } catch(error) {
      next(error)
    }
  }


  static async findAll(req, res, next) {
    try {
      let tasks = await Category.findAll({
        include: { model: Task, include: User},
        order: [['id', 'asc']]
      })
      // let backlog_tasks = await Task.findAll({where: {CategoryId: 1}})
      // let todo_tasks = await Task.findAll({where: {CategoryId: 2}})
      // let done_tasks = await Task.findAll({where: {CategoryId: 3}})
      // let completed_task = await Task.findAll({where: {CategoryId: 4}})

      // let data = {
      //   tasks: tasks,
      //   backlog: backlog_tasks,
      //   todo: todo_tasks,
      //   done: done_tasks,
      //   completed: completed_task
      // }

      res.status(200).json(tasks)
    } catch(error) {
      if (error) {
        next(error)
      } else {
        next({name: 'cantRetrieve'})
      }
    }
  }


  static async findOne(req, res, next) {
    try {
      let {id} = req.params
      let task = await Task.findByPk(id)

      if (task) {
        res.status(200).json(task)
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next(error)
    }
  }


  static async update(req, res, next) {
    try {
      let {id} = req.params
      let {name} = req.body
      let task = await Task.findByPk(id)
      task.name = name
      await task.save()

      res.status(200).json(task)
    } catch(error) {
      next(error)
    }
  }


  static async setStatus(req, res, next) {
    try {
      let {id} = req.params
      let {CategoryId} = req.body

      let task = await Task.findByPk(id)

      await task.update({CategoryId})

      res.status(200).json(task)
    } catch(error) {
      next(error)
    }
  }


  static async delete(req, res, next) {
    try {
      let {id} = req.params
      let task = await Task.findByPk(id)
      task.destroy()
      console.log('TRY', task);
      res.status(200).json({msg: 'Delete task successfully'})
    } catch(error) {
      console.log('ERROR', error);
      next(error)
    }
  }

}

module.exports = {TaskController}