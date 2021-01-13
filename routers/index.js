const router = require('express').Router();

const task = require('./task.js')
const user = require('./user.js');

const Controller = require('../controllers/controller.js');
const { authenticate } = require('../middlewares/auth.js');

router.get('/', Controller.home);

router.use('/', user);

router.use(authenticate);
router.use('/task', task);

module.exports = router;