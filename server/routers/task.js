const router = require('express').Router()
const Task = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication) // v
router.get('/', Task.showAllTask) // v
router.post('/', Task.createTask) // v

router.use('/:id', authorization) // v 
router.get('/:id', Task.getTaskId) // v 
router.put('/:id', Task.editTask) // v 
router.patch('/:id', Task.editCategory) // v 
router.delete('/:id', Task.deleteTask) // v



module.exports = router