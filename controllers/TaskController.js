const { Task } = require("../models");

class TaskController {
  static getAllTask(req, res, next) {
    // TODO: ADD TOKEN

    Task.findAll()
      .then((allDataTask) => {
        return res.status(200).json(allDataTask);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getTask(req, res, next) {
    // TODO: ADD TOKEN

    const id = req.body.id;
    Task.findOne({ where: { id } })
      .then((dataTask) => {
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static postTask(req, res, next) {
    // TODO: ADD UserId, CategoryId

    const { title } = req.body;
    Task.create({ title })
      .then((dataTask) => {
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static putTask(req, res, next) {
    const id = req.params.id;
    const { title, CategoryId } = req.body;

    Task.update({ where: { title, CategoryId } })
      .then((dataTask) => {
        if (!dataTask) {
          console.log(dataTask);
        }
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteTask(req, res, next) {
    id = req.params.id;

    Task.destroy({ where: { id } })
      .then((dataTask) => {
        if (!dataTask) {
          console.log(dataTask);
          // throw new Error("Invalid Id");
        }
        return res.status(200).json({ message: "Task has been deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = TaskController;
