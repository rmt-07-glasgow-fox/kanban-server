const router = require('express').Router()
const ControllerCategory = require('../controllers/category')

router.get('/category', ControllerCategory.getCategory)
router.post('/category', ControllerCategory.createCategory)
router.delete('/category/:item', ControllerCategory.deleteCategory)

module.exports = router

