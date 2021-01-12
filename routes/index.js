const router = require('express').Router();
const isLogin = require('../middlewares/isLogin');
const authRouter = require('./authRouter');
const taskRouter = require('./taskRouter');


router.get('/', (req, res) => res.status(200).json('hello kanban from server'));
router.use(authRouter);
router.use(isLogin)
router.use(taskRouter)


module.exports = router;