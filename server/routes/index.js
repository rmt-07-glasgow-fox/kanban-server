const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const kanbanRoutes = require('./kanbanRoutes')

router.get('/', (req, res) => {
    res.send("Test Oke")
})

router.use('/', userRoutes)
router.use(authenticate)
router.use('/kanban', kanbanRoutes)

module.exports = router