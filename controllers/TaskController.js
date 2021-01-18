const { Task, User } = require("../models");

class TaskController {
  static postTask(req, res, next) {
    const newTask = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.user.id,
    };

    Task.create(newTask)
      .then((task) => {
        res.status(201).json(task);
      })
      .catch((err) => {
        if (err.errors[0].path === "title") {
          next({ name: "title" });
        } else if (err.errors[0].path === "category") {
          next({ name: "category" });
        } else {
          next(err);
        }
      });
  }

  static getTask(req, res, next) {
    Task.findAll({
      include: User,
    })
      .then((tasks) => {
        tasks ? res.status(200).json(tasks) : next({ name: "notFound" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTaskById(req, res, next) {
    const taskId = +req.params.id;

    Task.findByPk(taskId, {
      include: User,
    })
      .then((task) => {
        task ? res.status(200).json(task) : next({ name: "notFound" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static putTaskById(req, res, next) {
    const taskId = +req.params.id;

    const updateTask = {
      title: req.body.title,
      category: req.body.category,
    };

    Task.update(updateTask, {
      where: {
        id: taskId,
      },
      returning: true,
    })
      .then((task) => {
        task[0] === 0 ? next({ name: "notFound" }) : res.status(200).json(task);
      })
      .catch((err) => {
        if (err.errors[0].path === "title") {
          next({ name: "title" });
        } else if (err.errors[0].path === "category") {
          next({ name: "category" });
        } else {
          next(err);
        }
      });
  }

  static patchTaskById(req, res, next) {
    const taskId = +req.params.id;

    const updateTask = {
      category: req.body.category,
    };

    Task.update(updateTask, {
      where: {
        id: taskId,
      },
      returning: true,
    })
      .then((task) => {
        task[0] === 0 ? next({ name: "notFound" }) : res.status(200).json(task);
      })
      .catch((err) => {
        if (err.errors[0].path === "category") {
          next({ name: "category" });
        } else {
          next(err);
        }
      });
  }

  static deleteTaskById(req, res, next) {
    const taskId = +req.params.id;

    Task.destroy({
      where: { id: taskId },
    })
      .then((task) => {
        task === 1
          ? res.status(200).json({ message: "Task has been deleted" })
          : next({ name: "notFound" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TaskController;
