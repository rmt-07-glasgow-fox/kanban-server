const {
  Kanban,
  User,
  Category
} = require('../models')

class CategoryController {
  static getCategories(req, res, next) {
    Category.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static addCategories(req, res, next) {
    let value = {
      name: req.body.name,
      UserId: req.userData.id
    }
    Category.create(value)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          next({
            status: 400,
            errors: err.errors
          })
        } else {
          next(err)
        }
      })
  }

  static deleteCategories(req, res, next) {
    let catId = req.params.id
    Category.destroy({
        where: {
          id: catId
        }
      })
      .then(data => {
        if (data) {
          return Kanban.destroy({
            where: {
              CategoryId: catId
            }
          })
        } else {
          next({
            status: 404
          })
        }
      })
      .then(data => {
        res.status(200).json({
          message: "Delete category success"
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static editCategories(req, res, next){
    let idCat = req.params.id
    let value = {
        name: req.body.name
    }
    Category.update(value, {
        where: {
            id: idCat
        },
        returning: true
    })
    .then(data => {
        if(data){
            res.status(200).json(data[1][0])
        } else {
            next({status: 404})
        }
    })
    .catch(err => {
        if(err.name == "SequelizeValidationError"){
            next({
                status: 400,
                errors: err.errors
            })
        } else {
            next(err)
        }
    })
  }
}

module.exports = CategoryController