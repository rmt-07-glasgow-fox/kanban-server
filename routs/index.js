const rout = require('express').Router()
const routUser = require('../routs/user')
const routKanban = require('../routs/kanban')
const {authentication} = require('../midleware/auth')

rout.get('/',(req,res)=>{
    res.send('WELCOME')
})

rout.use(routUser)
rout.use(authentication)
rout.use(routKanban)

module.exports = rout