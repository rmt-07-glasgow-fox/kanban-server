const router = require("express").Router();
const TaskController = require("../controllers/task");
const { taskAuthorization } = require("../middlewares/auth");

router.post("/", TaskController.create);
router.get("/", TaskController.listAll);
router.get("/:CategoryId", TaskController.getPerCategory);
router.get("/auth/:id", taskAuthorization, TaskController.checkAuth);
router.get("/focus/:id", taskAuthorization, TaskController.getSpecific);
router.put("/:id", taskAuthorization, TaskController.update);
router.delete("/:id", taskAuthorization, TaskController.delete);

module.exports = router;
