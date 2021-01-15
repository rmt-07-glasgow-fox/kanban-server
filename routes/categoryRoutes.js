const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/', CategoryController.getAllController)
router.post('/', CategoryController.addNewCategory)

module.exports = router