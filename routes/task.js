const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController.js");

router.get("/", TaskController.getAllTask);
router.post("/", TaskController.postTask);
router.get("/:id", TaskController.getTask);
router.put("/:id", TaskController.putTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
