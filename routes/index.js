const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const taskRouter = require("./task.js");
const categoryRouter = require("./category.js");
const { authenticate } = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.send("Welcome to KANBAN");
});

router.use("/", userRouter);
router.use(authenticate);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);

module.exports = router;
