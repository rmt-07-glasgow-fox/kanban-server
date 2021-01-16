const { Task } = require('../models');

class AppController {
  static async create(req, res, next) {
    const newTask = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.user.id,
    };
    try {
      const createdTask = await Task.create(newTask);
      res.status(201).json({ createdTask });
    } catch (err) {
      next(err);
    }
  }


  // static create(req, res, next) {
  //   const { title, category } = req.body;
  //   let newTodo = { title, category, UserId: req.currentUser.id }   
  //   Task
  //     .create(newTodo)
  //     .then(todo => {
  //       return res.status(201).json(todo)
  //     })
  //     .catch(err => {
  //       next(err)
  //     })
  // }

  static async getAll(req, res, next) {
    try {
      const tasks = await Task.findAll(/* {
        include: [User],
      } */);
      res.status(200).json({tasks});
    } catch (err) {
      next(err);
    }
  }

  // static getAll(req, res, next) {
  //   Task
  //     .findAll()
  //     //   })
  //     .then((tasks) => {
  //       return res.status(200).json({
  //         tasks,
  //       })
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // }

  static async editApp(req, res, next) {
    const id = +req.params.id;
    console.log(id);
    const editTask = {
      title: req.body.title,
      category: req.body.category,
    };
    try {
      const editedTask = await Task.update(editTask, { where: { id }, returning: true });
      if (editedTask[0] > 0) {
        res.status(200).json(editedTask[1][0]);
      } else {
        throw { status: 404, message: 'task not found' };
      }
    } catch (err) {
      next(err);
    }
  }

  // static updateApp(req, res, next) {}

  static async deleteApp(req, res, next) {
    try {
      const id = +req.params.id;
      const deletedTask = await Task.destroy({ where: { id }, returning: true });
      if (deletedTask > 0) {
        res.status(200).json({ message: 'succesfully delete a task' });
      } else {
        throw { status: 404, message: 'task not found' };
      }
    } catch (err) {
      next(err);
    }
  }

  // static deleteApp(req, res, next) {
  //   const id = +req.params.id;

  //   Task
  //     .destroy({
  //       where: {
  //         id
  //       }
  //     })
  //     .then(todo => {
  //       if (todo === 1) {
  //         res.status(200).json({
  //           message: "Successfully delete your todo"
  //         });
  //       } else {
  //         next({
  //           name: "TodoNotFound"
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // }
}

module.exports = AppController;
