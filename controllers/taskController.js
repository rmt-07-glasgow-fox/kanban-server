const {Task} = require("../models")

class Controller { 
  static async createTask(req, res, next) {
    try {
      const data = {
        title: req.body.title,
        category: req.body.category,
        UserId: req.user.id,
        CatId: req.body.CatId
      }
      const task = await Task.create(data)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async getTasks(req, res, next) {
    try {
      const tasks = await Task.findAll({order: ['id']})
      res.status(200).json(tasks)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getTask(req, res, next) {
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
      console.log(error);
      next(error)
    }
  }

  static async updateTask(req, res, next) {
    try {
      const id = req.params.id
      const data = {
        title: req.body.title,
        CatId: req.body.CatId
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

  static async patchTask(req, res, next) {
    try {
      const id = req.params.id
      let task = await Task.findByPk(id)
      if (task) {
        switch (task.CatId) {
          case 1:
            task.CatId = 2
            break;
          case 2:
            task.CatId = 3
            break;
          case 3:
            task.CatId = 4
            break;
          case 4:
            task.CatId = 5
            break;
          case 5:
            task.CatId = 1
            break;
        }
        task = await Task.update(data, {where: {id}, returning: true})
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

  static async deleteTask(req, res, next) {
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