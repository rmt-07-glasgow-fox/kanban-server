const CategoryController = require('../controllers/categoryController')

const router = require('express').Router()

router.post('/', CategoryController.create)
router.get('/', CategoryController.findAll)
// router.use('/:id', Auth.authorization)
router.get('/:id', CategoryController.findByPk)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

module.exports = router