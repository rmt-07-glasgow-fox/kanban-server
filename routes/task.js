const route = require('express').Router()
const { TaskController } = require('../controllers')
const authorization = require('../middlewares/authorization')

route.get('/tasks', TaskController.fetchAll)
route.post('/tasks', TaskController.addTask)

route.use('/tasks/:id', authorization)
route.put('/tasks/:id', TaskController.putTask)
route.patch('/tasks/:id', TaskController.patchTask)
route.delete('/tasks/:id', TaskController.deleteTask)

module.exports = route