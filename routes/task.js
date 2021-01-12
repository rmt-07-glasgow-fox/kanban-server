const router = require("express").Router();
const TaskController = require("../controllers/task");
const { taskAuthorization } = require("../middlewares/auth");

router.post("/", TaskController.create);
router.get("/:CategoryId", TaskController.listAll);
router.put("/:id", taskAuthorization, TaskController.update);
router.delete("/:id", taskAuthorization, TaskController.delete);

module.exports = router;
