const router = require('express').Router()
const CategoryController = require('../controllers/categroryController')
const { authorization } = require('../middlewares/auth')

router.post('/', CategoryController.postCategoryHandler)
router.get('/', CategoryController.getCategoryHandler)
router.put('/:id', authorization, CategoryController.putCategoryHandler)
router.delete('/:id', authorization, CategoryController.deleteCategoryHandler)


module.exports = router