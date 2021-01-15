const router = require('express').Router()
const routerTask = require('./task')
const routerUser = require('./user')

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Server Kanban Marcella'})
})
router.use(routerUser)
router.use('/tasks', routerTask)

module.exports = router