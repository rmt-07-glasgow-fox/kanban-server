const { Category } = require('../models')

class CategoryController {
  static getAllController(req, res, next){
    Category.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static addNewCategory(req, res, next){
    Category.create({
      name: req.body.name || ''
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CategoryController