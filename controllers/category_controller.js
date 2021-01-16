const { Category } = require('../models')

class CategoryController {

  static async index(req, res, next) {
    try {
      let categories = await Category.findAll()

      res.status(200).json(categories)
    } catch(error) {
      next(error)
    }
  }

  static async show(req, res, next) {
    try {
      let category = await Category.findByPk(req.params.id)
      res.status(200).json(category)
    } catch(error) {
      next(error)
    }
  }

}

module.exports = {CategoryController}