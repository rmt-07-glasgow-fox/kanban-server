const router = require('express').Router()
const Controller = require('../controllers/categoryController.js')
const { authorize } = require('../middlewares/auth')


router.get('/', Controller.showCategory)
router.post('/', Controller.addCategory)
router.put('/:CategoryId', authorize, Controller.updateCategory)
router.delete('/:CategoryId', authorize, Controller.deleteCategory)

module.exports = router