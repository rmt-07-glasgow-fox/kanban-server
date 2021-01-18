const router = require('express').Router()
const CategoryController = require('../controllers/categroryController')

router.post('/', CategoryController.postCategoryHandler)
router.get('/', CategoryController.getCategoryHandler)
router.put('/:id', CategoryController.putCategoryHandler)
router.delete('/:id', CategoryController.deleteCategoryHandler)


module.exports = router