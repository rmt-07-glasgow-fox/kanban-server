const router = require('express').Router();
const taskRouters = require('./task')
const authRouters = require('./auth');
const { authentication } = require('../middlewares/authMiddle');

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'hay domo'
    });
})

router.use(authRouters)
router.use(authentication)
router.use('/tasks', taskRouters)

module.exports = router