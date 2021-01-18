const router = require("express").Router()
const KanbanListController = require("../controllers/kanbanlistController")
const {authorize} = require("../middlewares/auth")

router.get("/tasks", KanbanListController.getLists)
router.post("/tasks", KanbanListController.add)
router.get("/categories", KanbanListController.category)
router.get("/tasks/:id", authorize, KanbanListController.pickOne)
router.delete("/tasks/:id", authorize, KanbanListController.delete)
router.patch("/tasks/:id", authorize, KanbanListController.patch)
router.put("/tasks/:id", authorize, KanbanListController.put)

module.exports = router