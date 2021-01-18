const router = require('express').Router()

const TaskController = require('../controller/taskController')
const { authorize } = require('../middlewares/auth')

router.route('/')
  .get(TaskController.showAll)
  .post(TaskController.create)

router.route('/:id')
  .get(authorize ,TaskController.showOne)
  .put(authorize, TaskController.edit)
  .patch(authorize, TaskController.updateCategory)
  .delete(authorize ,TaskController.delete)

module.exports = router