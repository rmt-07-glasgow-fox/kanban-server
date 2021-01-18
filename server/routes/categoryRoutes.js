const { CategoryController } = require('../controllers')
const { categoriesAuth } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.addCategories)
router.delete('/:id', categoriesAuth, CategoryController.deleteCategories)
router.patch('/:id', categoriesAuth, CategoryController.editCategories)

module.exports = router