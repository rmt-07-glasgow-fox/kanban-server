const router = require('express').Router()
const CategoryController = require('../controllers/controllerCategory.js')

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.createCategory)
router.delete('/', CategoryController.deleteCategory)

module.exports = router