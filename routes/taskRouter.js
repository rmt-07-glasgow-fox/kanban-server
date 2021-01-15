const router = require("express").Router()
const taskController = require("../controllers/taskController")
const {
  authorization
} = require("../middlewares/middleware")

router.post("/tasks", taskController.createTask)
router.post("/categories", taskController.createCategory)
router.get("/tasks", taskController.getAllTask)
router.get("/categories", taskController.getAllCategory)


router.delete("/categories/:id", taskController.deleteCategory)
router.get("/tasks/:id", authorization, taskController.getOneTask)
router.put("/tasks/:id", authorization, taskController.updateOneTask)
router.patch("/tasks/:id", authorization, taskController.changeTaskCategory)
router.delete("/tasks/:id", authorization, taskController.deleteOneTask)


module.exports = router