const router = require("express").Router()
const taskController = require("../controllers/taskController")
const {
  authorization
} = require("../middlewares/middleware")

router.post("/tasks", taskController.createTask)
router.post("/category", taskController.createCategory)
router.get("/tasks", taskController.getAllTask)

router.get("/tasks/:id", authorization, taskController.getOneTask)
router.put("/tasks/:id", authorization, taskController.updateOneTask)
router.delete("/tasks/:id", authorization, taskController.deleteOneTask)

module.exports = router