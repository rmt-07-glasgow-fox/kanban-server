const router = require ('express').Router()
const TaskController = require ('../controllers/TaskController')
const { authorize } = require ('../middlewares/auth')

router.get ('/tasks', TaskController.getTask)

router.post ('/tasks', TaskController.postTask)

router.put ('/tasks/:id', authorize, TaskController.putTask)

router.patch ('/tasks/:id', authorize, TaskController.patchTask)

router.delete ('/tasks/:id', authorize, TaskController.deleteTask)

module.exports = router