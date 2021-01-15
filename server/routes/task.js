const router = require ("express").Router()
const TaskController = require("../controllers/taskController")
const { authorization } = require ("../middlewares/auth")

router.get ("/", TaskController.list)
router.post ("/", TaskController.add)
router.get ("/:id", authorization, TaskController.getOne)
router.put ("/:id", authorization, TaskController.edit)
router.patch ("/:id", authorization, TaskController.changeCategory)
router.delete ("/:id", authorization, TaskController.removeOne)


module.exports = router