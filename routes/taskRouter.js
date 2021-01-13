const router = require('express').Router()
const TaskController = require('../controllers/taskController')

router.get('/', TaskController.getAllTasks)

router.get('/:id', TaskController.getTaskDescription)

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router
