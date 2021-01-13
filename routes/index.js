const router = require('express').Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const { authenticate } = require('../middlewares/auth')

router.use(userRouter);
router.use(authenticate)
router.use('/tasks', taskRouter);

module.exports = router