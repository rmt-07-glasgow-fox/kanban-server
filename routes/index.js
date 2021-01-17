const router = require('express').Router();
const userRouter = require('./user');
const { authentication } = require('../middlewares/auth');
const taskRouter = require('./task');
const categoryRouter = require('./category');

router.get('/', (req, res) => {
    res.send(`hello world`)
})

router.use('/users', userRouter);

router.use(authentication);

router.use('/categories', categoryRouter);

router.use('/tasks', taskRouter);

module.exports = router;