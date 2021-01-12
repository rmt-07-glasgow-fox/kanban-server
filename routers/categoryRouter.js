const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.post('/', CategoryController.AddCategory)
router.get('/', CategoryController.ListCategory)

module.exports = router