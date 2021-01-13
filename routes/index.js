const router = require('express').Router();
const authRouter = require('./authRouter');
const isLogin = require('../middlewares/isLogin');
const taskRouter = require('./taskRouter');
const organisationRouter = require('./organisationRouter');



router.get('/', (req, res) => res.status(200).json('hello kanban from server'));
router.use(authRouter);
router.use(isLogin)
router.use('/tasks', taskRouter)
router.use('/organisations', organisationRouter)



module.exports = router;