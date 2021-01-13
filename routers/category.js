const category = require('express').Router()
const categoryController = require('../controller/categoryController')

category.get('/category', categoryController.readData)
category.post('/category', categoryController.create)

module.exports = category