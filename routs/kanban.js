const rout = require('express').Router()
const kanban = require('../controllers/kanban')
const {authorization} = require('../midleware/auth')

rout.get('/kanban',kanban.findAll)
rout.post('/kanban',kanban.add)
rout.use(authorization)
rout.put('/kanban/:id',kanban.put)
rout.patch('/kanban/:id',kanban.patch)
rout.delete('/kanban/:id',kanban.destroy)


module.exports = rout
