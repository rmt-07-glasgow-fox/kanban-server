const express = require('express')
const router = express.Router()

const {CategoryController} = require('../controllers/categoryController')

router.post('/categories',CategoryController.create)
router.delete('/categories/:id',CategoryController.deleteCategory)

module.exports = router