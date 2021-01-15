const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const categoryRouter = require('./categoryRouter');
const organizationRouter = require('./organizationRouter');
const taskRouter = require('./taskRouter');

router.use(authRouter);
router.use('/categories', categoryRouter);
router.use('/tasks', taskRouter);
router.use('/organizations', organizationRouter);

module.exports = router;