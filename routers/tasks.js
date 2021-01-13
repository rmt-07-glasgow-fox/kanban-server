const task = require('express').Router()
const taskControl = require('../controller/taskController')
const { authorized } = require('../middleware/auth')

task.get('/task', taskControl.readAll)
task.post('/task', taskControl.create)

// task.put('/task/:id', (req, res) => {
//     res.send('hello')
// })

task.put('/task/:id', authorized ,taskControl.update)
task.delete('/task/:id', authorized ,taskControl.delete)

module.exports = task