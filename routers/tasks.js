const task = require('express').Router()
const taskControl = require('../controller/taskController')

task.get('/task', taskControl.readAll)
task.post('/task', taskControl.create)
task.put('/task/:id', taskControl.update)
task.delete('/task/:id', taskControl.delete)

module.exports = task