const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get("/", TaskController.getAllTask)
router.post("/", TaskController.createTask)
router.delete("/:id", authorization, TaskController.deleteTask)
router.patch("/:id", authorization, TaskController.editCategoryTask)
router.put("/:id", authorization, TaskController.editTask)

module.exports = router