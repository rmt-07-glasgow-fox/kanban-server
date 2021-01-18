const router = require('express').Router()
const { TaskController } = require('../controllers')
const { authorize } = require('../middlewares/auth')

router.get('/', TaskController.get)
router.post('/', TaskController.create)
router.use('/:id', authorize)
router.put('/:id', TaskController.updateAll)
router.patch('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router