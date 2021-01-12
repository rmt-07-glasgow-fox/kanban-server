const router = require("express").Router()
const KanbanListController = require("../controllers/kanbanlistController")
const {authorize} = require("../middlewares/auth")

router.get("/tasks", KanbanListController.getLists)
router.post("/tasks", KanbanListController.add)
router.delete("/tasks/:id", authorize, KanbanListController.delete)

module.exports = router