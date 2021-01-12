const { Task } = require("../models");

class TaskController {
  static create(req, res, next) {
    const { title, CategoryId } = req.body;
    const UserId = req.user.id;
    const { OrganizationId } = req.user;

    Task.create({
      title,
      CategoryId,
      UserId,
      OrganizationId,
    })
      .then((response) => {
        res.status(201).json({
          id: response.id,
          title: response.title,
          CategoryId: response.CategoryId,
          UserId: response.UserId,
          OrganizationId: response.OrganizationId,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getPerCategory(req, res, next) {
    const { CategoryId } = req.params;
    const { OrganizationId } = req.user;

    Task.findAll({
      where: {
        CategoryId,
        OrganizationId,
      },
      // include: User,
    })
      .then((response) => {
        // console.log(response[0]);
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getSpecific(req, res, next) {
    const id = +req.params.id;
    Task.findByPk(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const id = +req.params.id;
    const { title, CategoryId } = req.body;

    Task.update(
      {
        title,
        CategoryId,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((response) => {
        if (response[0] === 1) {
          const updated = {
            id: response[1][0].id,
            title: response[1][0].title,
            CategoryId: response[1][0].CategoryId,
            UserId: response[1][0].UserId,
            OrganizationId: response[1][0].OrganizationId,
          };
          res.status(200).json({ updated });
        } else {
          next({ name: "FailUpdate" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const id = +req.params.id;
    Task.destroy({ where: { id } })
      .then((response) => {
        res.status(200).send({ message: `Task ${id} successfully deleted` });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TaskController;
