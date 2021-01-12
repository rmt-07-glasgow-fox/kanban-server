const { Category } = require("../models");

class CategoryController {
  static getAllCategory(req, res, next) {
    Category.findAll()
      .then((allDataCategory) => {
        return res.status(200).json(allDataCategory);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getCategory(req, res, next) {
    const id = req.params.id;

    Category.findOne({ where: { id } })
      .then((dataCategory) => {
        return res.status(200).json(dataCategory);
      })
      .catch((err) => {
        next(err);
      });
  }

  static postCategory(req, res, next) {
    const { name } = req.body;

    Category.create({ name })
      .then((dataCategory) => {
        return res.status(200).json(dataCategory);
      })
      .catch((err) => {
        next(err);
      });
  }

  static putCategory(req, res, next) {
    const id = req.params.id;

    Category.update(
      {
        name: req.body.name || null,
      },
      { where: { id } }
    )
      .then((dataCategory) => {
        if (!dataCategory) {
          next(err);
        }
        return res.status(200).json({ message: "Category has been updated" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteCategory(req, res, next) {
    const id = req.params.id;

    Category.destroy({ where: { id } })
      .then((dataCategory) => {
        if (!dataCategory) {
          next(err);
        }
        return res.status(200).json({ message: "Category has been deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CategoryController;
