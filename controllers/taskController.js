const { Task, User } = require('../models');

class TaskController {

  static async getAll(req, res, next) {
    try {
      const tasks = await Task.findAll({
        include: User, 
        order: [ ['id', 'DESC'] ] 
      });
      return res.status(200).json(tasks);
    }
    catch (err) {
      console.log(err);
      return next(err);
    }
  }

  static async createTask(req, res, next) {
    try {
      const { title, category } = req.body;
      const UserId = req.userId;
      const newTask = { title, category, UserId };
      const createdTask = await Task.create(newTask);
      return res.status(201).json(createdTask);
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
      console.log(updatedTask);
      if(updatedTask[0] === 1) return res.status(200).json({ message: 'Success update task'});      
      return next(err);
    }
    catch (err) {
      return next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTask = await Task.destroy({ where: {id} });
      if(deletedTask === 1) return res.status(200).json({ message: 'Success delete task'});      
      return next(err);
    }
    catch (err) {
      return next(err);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const id = req.params.id;
      const task = await Task.findByPk(id);
      return res.status(200).json(task);   
    }
    catch (err) {
      return next(err);
    }
  }

}


module.exports = TaskController;