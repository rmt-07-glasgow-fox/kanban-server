const { Task } = require('../models/task.js');

class TaskCOntroller {
  static async createTask(req, res, next) {
    try {
      const input = {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        category: req.body.category,
        UserId: req.user.id
      };
      const create = await Task.create(input);

      return res.status(201).json(create);
    } catch (err) {
      next(err);
    };
  };

  static async getTask(req, res, next) {
    try {
      const get = await Task.findAll();

      return res.status(200).json(get);
    } catch (err) {
      next(err);
    };
  };

  static async getOneTask(req, res, next) {
    try {
      const inputID = Number(req.params.id);
      const getDetail = await Task.findByPk(inputID);

      if (!getDetail) throw { name: 'notFound' };

      return res.status(200).json(getDetail);
    } catch (err) {
      next(err);
    };
  };

  static async putTask(req, res, next) {
    try {
      const inputID = Number(req.params.id);
      const input = {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        category: req.body.category,
      };
      const update = await Task.update(input, { where: { id: inputID } });
      const getOne = await Task.findByPk(inputID, { update });

      if (!getOne) throw { name: 'notFound' };

      return res.status(200).json(getOne);
    } catch (err) {
      next(err);
    };
  };

  static async patchTask(req, res, next) {
    try {
      const inputID = Number(req.params.id);
      const { category } = req.body;
      const patch = await Task.update({ category }, { where: { id: inputID } });
      const getOne = await Task.findByPk(inputID, { patch });

      if (!getOne) throw { name: 'notFound' };

      return res.status(200).json(getOne);
    } catch (err) {
      next(err);
    };
  };

  static async deleteTask(req, res, next) {
    try {
      const inputID = Number(req.params.id);
      const del = await Task.findByPk(inputID);
  
      await Task.destroy({ where: { id: inputID } });
  
      if (!del) throw { name: 'notFound' };
  
      return res.status(200).json({ message: 'Task deleted successfully' });  
    } catch (err) {
      next(err);
    };
  };
};

module.exports = TaskCOntroller;