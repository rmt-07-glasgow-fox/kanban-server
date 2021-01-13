const {Task} = require("../models")

class Controller { 
  static async createTask(req, res) {
    try {
      const data = {
        title: req.body.title,
        category: `backlog`,
        UserId: req.user.id
      }
      const task = await Task.create(data)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async getTasks(req, res) {
    try {
      const tasks = await Task.findAll()
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async getTask(req, res) {
    try {
      const id = req.params.id
      const task = await Task.findByPk(id)
      if (task) {
        res.status(200).json(task)
      } else {
        throw {
          code: 400,
          message: `The task does not exist`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req, res) {
    try {
      const id = req.params.id
      const data = {
        title: req.body.title,
        category: req.body.category
      }
      const task = await Task.update(data, {where: {id}, returning: true})
      if (task) {
        res.status(200).json(task)
      } else {
        throw {
          code: 400,
          message: `The task does not exist`
        }
      }
    } catch (error) {
      
    }
  }

  static async patchTask(req, res) {
    try {
      const id = req.params.id
      const task = await Task.findByPk(id)
      const data = {
        category: task.category
      }
      if (data) {
        switch (data.category) {
          case `backlog`:
            data.category = `todo`
            break;
          case `todo`:
            data.category = `doing`
            break;
          case `doing`:
            data.category = `done`
            break;
          case `done`:
            data.category = `completed`
            break;
          case `completed`:
            data.category = `backlog`
            break;
        }
        const pTask = await Task.update(data, {where: {id}, returning: true})
        res.status(200).json(pTask)
      } else {
        throw {
          code: 400,
          message: `The task does not exist`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req, res) {
    try {
      const id = req.params.id
      const task = await Task.findByPk(id)
      if (task) {
        const title = task.title
        const deletedTask = await Task.destroy({where: {id}})
        res.status(200).json({message: `task: '${title}' success to delete`})
      } else {
        throw {
          code: 400,
          message: `The task does not exist`
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller