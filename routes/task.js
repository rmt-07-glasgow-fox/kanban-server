const router = require('express').Router()

const TaskController = require('../controller/taskController')
const { authorize } = require('../middlewares/auth')

router.route('/')
  .get(TaskController.showAll)
  .post(TaskController.create)

router.route('/:id')
  .delete(authorize ,TaskController.delete)

module.exports = router