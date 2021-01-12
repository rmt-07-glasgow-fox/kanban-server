const routerTask = require('express').Router()
const TaskController = require('../controllers/task')
const authen = require('../middlewear/authen')
const author = require('../middlewear/author')

routerTask.use(authen)
routerTask.get('/', TaskController.list)
routerTask.post('/', TaskController.createTask)
routerTask.get('/:id', author, TaskController.taskById)
routerTask.put('/:id', author, TaskController.edited)
routerTask.delete('/:id', author, TaskController.deleted)

module.exports = routerTask