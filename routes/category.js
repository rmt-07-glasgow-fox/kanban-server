const router = require('express').Router()

const CategoryController = require('../controller/categoryController')


router.get('/', CategoryController.listCat)
router.post('/', CategoryController.addCat )
router.delete('/:id', CategoryController.deleteCat)


module.exports = router