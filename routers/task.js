const router = require('express').Router()
const Controller = require('../controllers/task')
const {authorize} = require('../middlewares/auth')

router.post('/', Controller.create)

router.get('/', Controller.showTask)

router.get('/:id', authorize, Controller.showById)

router.put('/:id', authorize, Controller.update)

router.patch('/:id', authorize, Controller.patch)

router.delete('/:id', authorize, Controller.destroy)

module.exports = router