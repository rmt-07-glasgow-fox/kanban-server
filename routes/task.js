const router = require('express').Router()
const TaskController = require("../controllers/taskController")
const {authorize} = require("../middlewares/auth")

router.get(`/`, TaskController.getAll)
router.post(`/`, TaskController.create)

router.get(`/:id`, authorize, TaskController.getById)
router.put(`/:id`, authorize, TaskController.update)
router.patch(`/:id`, authorize, TaskController.patch)
router.delete('/:id', authorize, TaskController.delete)

module.exports = router