const { KanbanController } = require('../controllers')
const { authorized } = require('../middlewares')
const express = require('express')
const router = express.Router()

router.get('/', KanbanController.getAllTask)
router.post('/', KanbanController.addTask)
router.get('/:id', authorized, KanbanController.getTaskById)
router.put('/:id', authorized, KanbanController.putTask)
router.patch('/:id', authorized, KanbanController.patchTask)
router.delete('/:id', authorized, KanbanController.deleteTask)

module.exports = router