const { CategoryController } = require('../controllers/category_controller')
const router = require('express').Router()

router.get('/', CategoryController.index)
router.get('/:id', CategoryController.show)

module.exports = router