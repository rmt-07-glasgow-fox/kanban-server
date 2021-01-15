const express = require('express')
const router = express.Router()
const Controller = require('../controller/taskCont')
const { authorize } = require('../middleware/auth')

router.post('/', Controller.createTask)
router.get('/', Controller.getAll)
router.put('/:id', authorize, Controller.update)
router.patch('/:id', authorize, Controller.updateCategory)
router.delete('/:id', authorize, Controller.delete)

module.exports = router;