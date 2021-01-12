const { Category } = require("../models");

class CategoryController {
  static getAllCategory(req, res, next) {
    // TODO: ADD TOKEN

    Category.findAll()
      .then((allDataCategory) => {
        return res.status(200).json(allDataCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getCategory(req, res, next) {
    // TODO: ADD TOKEN

    const id = req.body.id;
    Category.findOne({ where: { id } })
      .then((dataCategory) => {
        return res.status(200).json(dataCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static postCategory(req, res, next) {
    // TODO: ADD UserId, CategoryId

    const { name } = req.body;
    Category.create({ name })
      .then((dataCategory) => {
        return res.status(200).json(dataCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static putCategory(req, res, next) {
    const id = req.params.id;

    Category.update({ where: { id } })
      .then((dataCategory) => {
        if (!dataCategory) {
          console.log(dataCategory);
        }
        return res.status(200).json(dataCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteCategory(req, res, next) {
    id = req.params.id;

    Category.destroy({ where: { id } })
      .then((dataCategory) => {
        if (!dataCategory) {
          console.log(dataCategory);
          // throw new Error("Invalid Id");
        }
        return res.status(200).json({ message: "Category has been deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = CategoryController;
