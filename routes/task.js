const router = require('express').Router()
const ControllerTasks = require("../controllers/tasks") 
const { authorize } = require('../middlewares/auth')

router.get("/", ControllerTasks.findAllTasks) 
router.post("/", ControllerTasks.insert) 
router.get("/:id", authorize, ControllerTasks.findOne) 
router.put("/:id", authorize, ControllerTasks.update) 
router.patch("/:id", authorize, ControllerTasks.patch)
router.delete("/:id", authorize, ControllerTasks.delete) 



module.exports = router