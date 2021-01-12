const router = require('express').Router();
const isLogin = require('../middlewares/isLogin');
const authRouter = require('./authRouter');

router.get('/', (req, res) => res.status(200).json('hello kanban from server'));
router.use(authRouter);
router.use(isLogin)

module.exports = router;