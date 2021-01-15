const express = require('express')
const router =  express.Router()
const Controller = require('../controllers/taskController')
const {authorization} = require('../middlewares/auth')

router.post('/task', Controller.addTask)
router.get('/task', Controller.listAllTask)
router.get('/task/:id', authorization,Controller.getTaskById)
router.put('/task/:id', authorization ,Controller.updateTask)
router.patch('/task/:id', authorization, Controller.updateCategory)
router.delete('/task/:id', authorization,Controller.deleteTask)

module.exports = router