const KanbanController = require('../controllers/kanban')
const { authorization } = require('../middlewares/auth')

const router = require('express').Router()

router.get('/',KanbanController.get)
router.get('/:id',KanbanController.getOne)
router.post('/',KanbanController.add)
router.use('/:id',authorization)
router.put('/:id',KanbanController.edit)
router.delete('/:id',KanbanController.delete)

module.exports = router