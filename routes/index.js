const router = require('express').Router()

const {
    auth
} = require('../middleware/auth')

const taskRoute = require('./task')
const userRoute = require('./user')
const catRoute = require('./category')

router.get('/', (req, res) => {
    res.status(200).json({
        msg : 'app get listen and jalan'
    })
})

router.use('/', userRoute)


router.use(auth)
router.use('/categories', catRoute)
router.use('/tasks', taskRoute)



module.exports = router