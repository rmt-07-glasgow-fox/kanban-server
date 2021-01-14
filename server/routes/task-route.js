const route = require('express').Router()
const Controller = require('../controllers/task-controller')
const { authentication, authorization } = require('../middlewares/auth')

// routing and endpoints
route.use(authentication)

route.get('/tasks', Controller.showTask)
route.post('/tasks', Controller.createTask)
route.get('/tasks/:id', Controller.showOne)

route.put('/tasks/:id', authorization, Controller.editTask)
route.patch('/tasks/:id', authorization, Controller.changeCategory)
route.delete('/tasks/:id', authorization, Controller.deleteTask)

module.exports = route