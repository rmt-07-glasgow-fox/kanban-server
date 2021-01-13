const router = require("express").Router()
const Controller = require("../controllers/taskController")
const {authentificate} = require("../middleware/authentificate")
const authorize = require("../middleware/authorize")

router.use(authentificate)

router.post('/', Controller.createTask)
router.get('/', Controller.getTasks)

router.get('/:id', authorize, Controller.getTask)
router.put('/:id', authorize, Controller.updateTask)
router.patch('/:id', authorize, Controller.patchTask)
router.delete('/:id', authorize, Controller.deleteTask)

module.exports = router
