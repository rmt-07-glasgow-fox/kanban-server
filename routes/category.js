const router = require('express').Router()

const CategoryController = require('../controller/categoryController')
const { authorizeCategory } = require('../middlewares/auth')

router.route('/')
  .get(CategoryController.showAll)
  .post(CategoryController.create)

router.route('/:id')
  .get(CategoryController.showOne)
  .put(authorizeCategory, CategoryController.edit)
  .delete(authorizeCategory, CategoryController.delete)

module.exports = router