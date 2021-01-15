const router = require('express').Router()
const Controller = require('../controllers/taskController.js')
const { authorize } = require('../middlewares/auth')


router.get('/', Controller.showTask)
router.post('/', Controller.addTask)
router.put('/:taskId', authorize, Controller.updateTask)
router.patch('/:taskId', authorize, Controller.updateStatus)
router.delete('/:taskId', authorize, Controller.deleteTask)

module.exports = router