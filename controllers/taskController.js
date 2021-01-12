const { Task } = require('../models');

class TaskController {

  static async getAll(req, res, next) {
    try {
      const tasks = await Task.findAll();
      return res.status(200).json(tasks);
    }
    catch (err) {
      return next(err);
    }
  }

  static async createTask(req, res, next) {
    try {
      const { title, category } = req.body;
      const UserId = req.userId;
      const newTask = { title, category, UserId };
      const createdTask = await Task.create(newTask);
      return res.status(200).json(createdTask);
    }
    catch (err) {
      return next(err);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const id = req.params.id;
      const { title, category } = req.body;   
      const updatedTask = await Task.update({ title, category }, { where: {id} });
      return res.status(200).json(updatedTask);
    }
    catch (err) {
      return next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTask = await Task.destroy({ where: {id} });
      return res.status(200).json(deletedTask);
    }
    catch (err) {
      return next(err);
    }
  }

}


module.exports = TaskController;