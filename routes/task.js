const router = require('express').Router()

const {
    author
} = require('../middleware/auth')

const TaskController = require('../controller/taskController')

// router.use(auth)

router.get('/', TaskController.listTask)
router.post('/', TaskController.addTask)

router.put('/:id', author, TaskController.moveTask)
router.delete('/:id', author, TaskController.deleteTask)


module.exports = router