const TaskController = require('../controllers/taskcontroller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router  = require('express').Router()

router.use(authentication)

router.post('/',TaskController.addTask)
router.get('/',TaskController.showTasks)
router.put('/:id',authorization,TaskController.editTask)
router.patch('/:id',authorization,TaskController.updateTask)
router.delete('/:id',authorization,TaskController.deleteTask)

module.exports = router