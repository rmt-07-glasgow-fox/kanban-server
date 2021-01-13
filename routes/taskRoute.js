const router = require("express").Router()
const Controller = require("../controllers/taskController")
const {authentificate} = require("../middleware/authentificate")
const {authorize} = require("../middleware/authorize")

router.use(authentificate)

router.post('/tasks', Controller.createTask)
router.get('/tasks/', Controller.getTasks)

router.get('/tasks/:id', authorize, Controller.getTask)
router.put('/tasks/:id', authorize, Controller.updateTask)
router.patch('/tasks/:id', authorize, Controller.patchTask)
router.delete('/tasks/:id', authorize, Controller.deleteTask)

module.exports = router
