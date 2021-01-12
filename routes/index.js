const router = require('express').Router();
const taskRouters = require('./task')
const authRouters = require('./auth')

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hay domo'
    });
})

router.use(authRouters)
router.use('/tasks', taskRouters)

module.exports = router