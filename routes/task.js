const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController.js");
const { authorize } = require("../middlewares/auth.js");

router.get("/", TaskController.getAllTask);
router.post("/", TaskController.postTask);
router.get("/:id", authorize, TaskController.getTask);
router.put("/:id", authorize, TaskController.putTask);
router.delete("/:id", authorize, TaskController.deleteTask);

module.exports = router;
