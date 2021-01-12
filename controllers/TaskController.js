const { Task } = require("../models");
const { verifyJwt } = require("../helpers/jwt.js");

class TaskController {
  static getAllTask(req, res, next) {
    Task.findAll()
      .then((allDataTask) => {
        return res.status(200).json(allDataTask);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTask(req, res, next) {
    const id = req.params.id;

    Task.findOne({ where: { id } })
      .then((dataTask) => {
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        next(err);
      });
  }

  static postTask(req, res, next) {
    const decoded = verifyJwt(req.headers.access_token);
    const { title, CategoryId } = req.body;
    Task.create({
      title,
      UserId: decoded.id,
      CategoryId,
    })
      .then((dataTask) => {
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        next(err);
      });
  }

  static putTask(req, res, next) {
    const id = req.params.id;

    Task.update(
      {
        title: req.body.title || null,
        CategoryId: req.body.CategoryId,
      },
      { where: { id } }
    )
      .then(() => {
        return res.status(200).json({ message: "Task have been updated" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTask(req, res, next) {
    const id = req.params.id;

    Task.destroy({ where: { id } })
      .then(() => {
        return res.status(200).json({ message: "Task have been deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TaskController;
