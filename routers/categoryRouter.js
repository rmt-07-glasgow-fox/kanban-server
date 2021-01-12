const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.ListCategory)
router.post('/', CategoryController.AddCategory)

module.exports = router