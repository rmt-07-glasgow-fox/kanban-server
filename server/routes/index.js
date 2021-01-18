const { authenticate } = require('../middlewares')
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const kanbanRoutes = require('./kanbanRoutes')
const categoryRoutes = require('./categoryRoutes')

router.get('/', (req, res) => {
    res.send("Test Oke")
})

router.use('/', userRoutes)
router.use(authenticate)
router.use('/categories', categoryRoutes)
router.use('/kanban', kanbanRoutes)

module.exports = router