const { Organization } = require("../models");

class OrganizationController {
  static create(req, res, next) {
    const { name } = req.body;

    Organization.create({
      name,
    })
      .then((response) => {
        res.status(201).json({
          id: response.id,
          name: response.name,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static listAll(req, res, next) {
    Organization.findAll()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const id = +req.params.id;
    const { name } = req.body;

    Organization.update(
      {
        name,
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
            name: response[1][0].name,
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

  // static delete(req, res, next) {
  //   const id = +req.params.id;

  //   Organization.destroy({
  //     where: { id },
  //   })
  //     .then((response) => {
  //       res.send(response);
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }
}

module.exports = OrganizationController;
