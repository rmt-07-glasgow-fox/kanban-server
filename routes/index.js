const router = require('express').Router();
const authRouter = require('./authRouter');
const isLogin = require('../middlewares/isLogin');
const taskRouter = require('./taskRouter');


router.get('/', (req, res) => res.status(200).json('hello kanban from server'));
router.use(authRouter);
router.use(isLogin)
router.use('/tasks', taskRouter)


module.exports = router;