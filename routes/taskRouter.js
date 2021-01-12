const router = require("express").Router()
const taskController = require("../controllers/taskController")
const { authorize } = require("../middlewares/authorization")


router.post('/', taskController.createTask)
router.get('/', taskController.getTask)

router.use('/:id', authorize)
router.get('/:id', taskController.getTaskById)
router.put('/:id', taskController.editTask)
router.delete('/:id', taskController.deleteTask)


module.exports = router