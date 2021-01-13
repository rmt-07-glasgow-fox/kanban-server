const router = require('express').Router();

const user = require('./user.js');

const Controller = require('../controllers/controller.js');

router.get('/', Controller.home);

router.use('/', user);

module.exports = router;