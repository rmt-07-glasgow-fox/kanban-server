const router = require("express").Router()
const taskController = require("../controllers/taskController")
const {authorization} = require("../middlewares/auth")

router.post("/", taskController.createTask)
router.get("/", taskController.showTasks)
router.get("/:id", taskController.showTask)
router.put("/:id", authorization, taskController.updateTask)
router.patch("/:id", authorization, taskController.updateStatusTask)
router.delete("/:id", authorization, taskController.deleteTask)

module.exports = router