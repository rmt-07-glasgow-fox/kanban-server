const router = require('express').Router()

const CategoryController = require('../controllers/categoryController')

router.get('/category', CategoryController.showCategory)

module.exports = router