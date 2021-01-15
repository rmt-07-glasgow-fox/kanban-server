const { Category } = require("../models");

class CategoryController {
  static list(req, res, next) {
    Category.findAll()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CategoryController